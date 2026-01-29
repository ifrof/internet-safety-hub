import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');

// Initialize Supabase client
const getSupabaseClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

// Lovable AI helper for product understanding
async function analyzeProductWithAI(input: {
  imageBase64?: string;
  productUrl?: string;
  productName?: string;
  hsCode?: string;
  scrapedContent?: string;
}): Promise<any> {
  const messages = [];
  
  let systemPrompt = `You are a product analysis expert. Analyze the given product information and extract structured data.
Return a JSON object with these fields:
- productTitle_ar: Arabic product title
- productTitle_en: English product title  
- productTitle_zh: Chinese product title (simplified)
- keywords_en: Array of 5-10 English search keywords for finding manufacturers
- keywords_zh: Array of 5-10 Chinese search keywords (simplified Chinese)
- materials: Array of materials used
- possible_hs_codes: Array of possible HS codes
- category: Product category
- must_have_specs: Key specifications a manufacturer must have

Be specific and include industry-specific terms. Focus on manufacturing keywords.`;

  let userContent: any[] = [];

  if (input.imageBase64) {
    userContent.push({
      type: "image_url",
      image_url: { url: `data:image/jpeg;base64,${input.imageBase64}` }
    });
    userContent.push({
      type: "text",
      text: "Analyze this product image and extract product information for finding Chinese manufacturers."
    });
  } else if (input.scrapedContent) {
    userContent.push({
      type: "text",
      text: `Analyze this product page content and extract product information:\n\n${input.scrapedContent}`
    });
  } else if (input.productName) {
    userContent.push({
      type: "text",
      text: `Analyze this product name and extract search keywords for finding Chinese manufacturers: "${input.productName}"`
    });
  } else if (input.hsCode) {
    userContent.push({
      type: "text",
      text: `Based on HS Code "${input.hsCode}", identify the product category and generate search keywords for finding Chinese manufacturers.`
    });
  }

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Lovable AI error:', errorText);
    throw new Error(`AI analysis failed: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  try {
    return JSON.parse(content);
  } catch {
    console.error('Failed to parse AI response:', content);
    return {
      productTitle_ar: input.productName || 'منتج غير محدد',
      productTitle_en: input.productName || 'Unknown product',
      keywords_en: [input.productName || 'product'],
      keywords_zh: ['产品']
    };
  }
}

// Firecrawl helper for URL scraping
async function scrapeUrl(url: string): Promise<string> {
  try {
    const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
        formats: ['markdown'],
        onlyMainContent: true,
      }),
    });

    if (!response.ok) {
      console.error('Firecrawl error:', await response.text());
      return '';
    }

    const data = await response.json();
    return data.data?.markdown || data.markdown || '';
  } catch (error) {
    console.error('Firecrawl scrape error:', error);
    return '';
  }
}

// Perplexity search helper
async function searchWithPerplexity(queries: string[]): Promise<any[]> {
  const results: any[] = [];
  
  for (const query of queries.slice(0, 4)) { // Limit to 4 queries
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'sonar',
          messages: [
            {
              role: 'system',
              content: `You are a factory researcher. Find DIRECT MANUFACTURERS (not trading companies) in China for the given product. 
For each factory found, provide:
- Company name (English and Chinese if available)
- Location/city
- Website URL
- Any evidence it's a real factory (factory photos, equipment, certifications, production lines)
- Warning signs if it might be a trading company

Return results as JSON array with fields: name, name_zh, location, website, links, manufacturing_evidence, trading_signals`
            },
            { role: 'user', content: query }
          ],
          search_recency_filter: 'month'
        }),
      });

      if (!response.ok) {
        console.error('Perplexity error:', await response.text());
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      const citations = data.citations || [];
      
      results.push({
        query,
        content,
        citations
      });
    } catch (error) {
      console.error('Perplexity search error:', error);
    }
  }
  
  return results;
}

// Parse factory candidates from Perplexity results
async function parseFactoryCandidates(searchResults: any[], normalizedProduct: any): Promise<any[]> {
  const candidatesPrompt = `Based on these search results, extract a list of potential factory candidates.

Search Results:
${JSON.stringify(searchResults, null, 2)}

Product Context:
${JSON.stringify(normalizedProduct, null, 2)}

For each candidate, extract:
- name: Company name
- name_zh: Chinese name if available
- location: City/Province
- website: Official website
- links: Array of relevant URLs (Alibaba, Made-in-China, etc.)
- manufacturing_signals: Evidence this is a real factory
- trading_signals: Evidence this might be a trading company

Return as JSON array. Only include companies that appear to be manufacturers, not obviously trading companies.`;

  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${LOVABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        { role: 'user', content: candidatesPrompt }
      ],
      response_format: { type: 'json_object' }
    }),
  });

  if (!response.ok) {
    console.error('Candidate parsing error:', await response.text());
    return [];
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  try {
    const parsed = JSON.parse(content);
    return parsed.candidates || parsed.factories || parsed || [];
  } catch {
    console.error('Failed to parse candidates:', content);
    return [];
  }
}

// Verify factory and calculate score
async function verifyFactory(candidate: any): Promise<any> {
  // Manufacturing signals (positive)
  const manufacturingSignals = [
    'factory', 'manufacturer', 'production line', 'workshop', 'equipment',
    'R&D', 'OEM', 'ODM', 'ISO', 'QC', 'quality control', 'capacity',
    '工厂', '车间', '生产线', '设备', '研发', '产能', '质量', 'OEM', 'ODM'
  ];

  // Trading signals (negative)
  const tradingSignals = [
    'trading', 'import', 'export', 'sourcing', 'agent', 'general merchandise',
    '贸易', '进出口', '代理', '商贸'
  ];

  let score = 50; // Base score
  const evidence: any[] = [];
  const redFlags: string[] = [];
  const whyFactory: string[] = [];

  // Check manufacturing signals
  const mfgSignalsFound = candidate.manufacturing_signals || [];
  if (Array.isArray(mfgSignalsFound)) {
    for (const signal of mfgSignalsFound) {
      if (typeof signal === 'string' && signal.length > 0) {
        score += 5;
        whyFactory.push(signal);
        evidence.push({
          type: 'Manufacturing Signal',
          claim: signal,
          sourceUrl: candidate.website || ''
        });
      }
    }
  }

  // Check trading signals (negative)
  const tradingFound = candidate.trading_signals || [];
  if (Array.isArray(tradingFound)) {
    for (const signal of tradingFound) {
      if (typeof signal === 'string' && signal.length > 0) {
        score -= 15;
        redFlags.push(signal);
      }
    }
  }

  // Bonus for having website
  if (candidate.website) {
    score += 5;
    evidence.push({
      type: 'Website',
      claim: 'موقع رسمي متاح',
      sourceUrl: candidate.website
    });
  }

  // Bonus for location info
  if (candidate.location) {
    score += 5;
    whyFactory.push(`موقع في ${candidate.location}`);
  }

  // Bonus for multiple links
  if (candidate.links && candidate.links.length > 1) {
    score += 5;
    for (const link of candidate.links.slice(0, 3)) {
      evidence.push({
        type: 'Listing',
        claim: 'تواجد على منصة B2B',
        sourceUrl: link
      });
    }
  }

  // Cap score
  score = Math.max(0, Math.min(100, score));

  // Acceptance criteria
  const isAccepted = score >= 40 && whyFactory.length >= 2 && redFlags.length < 3;

  return {
    ...candidate,
    score,
    evidence,
    red_flags: redFlags,
    why_factory: whyFactory.slice(0, 6),
    verification_steps: [
      'تواصل مباشرة مع المصنع عبر الهاتف أو WeChat',
      'اطلب فيديو جولة في المصنع',
      'استخدم خدمة فحص طرف ثالث قبل الدفع'
    ],
    is_accepted: isAccepted
  };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { imageBase64, productUrl, productName, hsCode, optional } = body;

    // Validate input - at least one required
    if (!imageBase64 && !productUrl && !productName && !hsCode) {
      return new Response(
        JSON.stringify({ error: 'يجب إدخال صورة أو رابط أو اسم المنتج أو HS CODE' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabase = getSupabaseClient();

    // Determine search type
    let searchType = 'name';
    let inputValue = productName || '';
    
    if (imageBase64) {
      searchType = 'image';
      inputValue = 'صورة منتج';
    } else if (productUrl) {
      searchType = 'url';
      inputValue = productUrl;
    } else if (hsCode) {
      searchType = 'hs_code';
      inputValue = hsCode;
    }

    // Create search record
    const { data: searchRecord, error: insertError } = await supabase
      .from('factory_searches')
      .insert({
        search_type: searchType,
        input_value: inputValue,
        optional_params: optional || {},
        status: 'processing'
      })
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw new Error('فشل في إنشاء سجل البحث');
    }

    const searchId = searchRecord.id;

    try {
      // Step 1: Product Understanding
      console.log('Step 1: Product Understanding');
      let scrapedContent = '';
      
      if (productUrl) {
        scrapedContent = await scrapeUrl(productUrl);
      }

      const normalizedProduct = await analyzeProductWithAI({
        imageBase64,
        productUrl,
        productName,
        hsCode,
        scrapedContent
      });

      // Update search with normalized product
      await supabase
        .from('factory_searches')
        .update({ normalized_product: normalizedProduct })
        .eq('id', searchId);

      // Step 2: Web Discovery
      console.log('Step 2: Web Discovery');
      const searchQueries = [
        `${normalizedProduct.productTitle_en || productName} manufacturer factory China OEM`,
        `${(normalizedProduct.keywords_en || []).slice(0, 3).join(' ')} China factory ISO OEM ODM`,
        `site:made-in-china.com ${(normalizedProduct.keywords_en || []).slice(0, 3).join(' ')} manufacturer`,
        `${normalizedProduct.productTitle_zh || ''} 工厂 生产厂家 OEM`
      ].filter(q => q.trim().length > 10);

      const searchResults = await searchWithPerplexity(searchQueries);

      // Step 3: Parse candidates
      console.log('Step 3: Parsing candidates');
      const candidates = await parseFactoryCandidates(searchResults, normalizedProduct);

      // Step 4: Verify each factory
      console.log('Step 4: Verifying factories');
      const verifiedFactories: any[] = [];
      let excludedCount = 0;

      for (const candidate of candidates.slice(0, 15)) { // Limit to 15 candidates
        const verified = await verifyFactory(candidate);
        
        if (verified.is_accepted) {
          verifiedFactories.push(verified);
        } else {
          excludedCount++;
        }
      }

      // Insert factory results
      for (const factory of verifiedFactories) {
        await supabase
          .from('factory_results')
          .insert({
            search_id: searchId,
            name: factory.name || 'Unknown Factory',
            name_zh: factory.name_zh || null,
            location: factory.location || null,
            website: factory.website || null,
            links: factory.links || [],
            score: factory.score,
            why_factory: factory.why_factory || [],
            evidence: factory.evidence || [],
            red_flags: factory.red_flags || [],
            verification_steps: factory.verification_steps || [],
            is_excluded: false
          });
      }

      // Update search status to completed
      await supabase
        .from('factory_searches')
        .update({ status: 'completed' })
        .eq('id', searchId);

      console.log(`Search completed: ${verifiedFactories.length} factories found, ${excludedCount} excluded`);

      return new Response(
        JSON.stringify({
          searchId,
          normalizedProduct,
          factoriesCount: verifiedFactories.length,
          excludedCount
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (pipelineError: any) {
      console.error('Pipeline error:', pipelineError);
      
      // Update search status to failed
      await supabase
        .from('factory_searches')
        .update({ 
          status: 'failed',
          error_message: pipelineError.message 
        })
        .eq('id', searchId);

      throw pipelineError;
    }

  } catch (error: any) {
    console.error('Factory search error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'حدث خطأ غير متوقع' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
