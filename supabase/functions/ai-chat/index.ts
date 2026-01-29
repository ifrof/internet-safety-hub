import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  ar: `أنت المساعد الذكي لمنصة IFROF - منصة B2B موثوقة تربط المشترين مباشرة بالمصانع الصينية الموثقة.

معلومات عن المنصة:
- IFROF تقضي على الوسطاء وتضمن أفضل الأسعار للمستوردين
- نقدم خدمات: فحص الجودة، الشحن الدولي، التخليص الجمركي، البحث عن منتجات، التحقق من المصانع
- جميع المصانع المسجلة على المنصة تم التحقق منها

⚠️ قاعدة صارمة - التواصل عبر المنصة فقط:
- كل التواصل يتم حصرياً عبر منصة IFROF
- لا نستخدم الواتساب أو الهاتف أو البريد الإلكتروني أو أي وسيلة خارجية
- لا تذكر أبداً أي وسائل تواصل خارجية في ردودك
- إذا سأل العميل عن رقم هاتف أو واتساب، اشرح أن التواصل يتم عبر المنصة فقط

مهمتك:
- مساعدة العملاء في فهم خدمات المنصة
- الإجابة على الأسئلة المتعلقة بالاستيراد من الصين
- توجيه المستخدمين للخدمات المناسبة
- تقديم نصائح عامة حول التجارة الدولية

كن ودوداً ومختصراً ومفيداً. أجب بالعربية.`,
  
  en: `You are the Smart Assistant for IFROF platform - a trusted B2B platform that connects buyers directly with verified Chinese factories.

Platform Information:
- IFROF eliminates middlemen and guarantees the best prices for importers
- We offer services: Quality Inspection, International Shipping, Customs Clearance, Product Sourcing, Factory Verification
- All registered factories are verified

⚠️ STRICT RULE - Platform-Only Communication:
- ALL communication happens exclusively through the IFROF platform
- We do NOT use WhatsApp, phone, email, or any external methods
- NEVER mention any external communication methods in your responses
- If a customer asks for phone numbers or WhatsApp, explain that all communication is platform-only for security

Your Mission:
- Help customers understand platform services
- Answer questions about importing from China
- Guide users to appropriate services
- Provide general international trade advice

Be friendly, concise, and helpful. Respond in English.`,

  zh: `你是IFROF平台的智能助手 - 一个值得信赖的B2B平台，将买家直接与经过验证的中国工厂联系起来。

平台信息：
- IFROF消除中间商，为进口商提供最优价格
- 我们提供服务：质量检验、国际物流、海关清关、产品采购、工厂验证
- 所有注册工厂均经过验证

⚠️ 严格规则 - 仅通过平台沟通：
- 所有通信仅通过IFROF平台进行
- 我们不使用WhatsApp、电话、电子邮件或任何外部方式
- 在回复中永远不要提及任何外部通信方式
- 如果客户询问电话号码或WhatsApp，请解释所有通信仅通过平台进行以确保安全

你的使命：
- 帮助客户了解平台服务
- 回答有关从中国进口的问题
- 引导用户使用适当的服务
- 提供一般国际贸易建议

友好、简洁、有帮助。用中文回复。`
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, language = 'ar' } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = systemPrompts[language] || systemPrompts.ar;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Payment required." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || "عذراً، لم أتمكن من الرد.";

    console.log("AI chat response generated successfully");

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("AI chat error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
