import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Input validation constants
const MAX_MESSAGE_LENGTH = 10000;
const MAX_PRODUCT_NAME_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 5000;
const MAX_NOTES_LENGTH = 2000;

// Sanitize text input - remove control characters
function sanitizeText(input: string, maxLength: number): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/[\x00-\x1F\x7F]/g, '')
    .trim()
    .slice(0, maxLength);
}

// Validate UUID format
function isValidUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

// Initialize Supabase client
const getSupabaseClient = (authHeader: string) => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
  );
};

// Service role client for rate limit checks
const getServiceClient = () => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.pathname.replace('/api', '');

  try {
    // Health check
    if (path === '/health' && req.method === 'GET') {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get factory contact info
    if (path === '/get-factory-contact' && req.method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const supabase = getSupabaseClient(authHeader);
      const serviceClient = getServiceClient();
      const token = authHeader.replace('Bearer ', '');
      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const userId = claimsData.claims.sub;

      // Check if user has premium subscription
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_plan')
        .eq('user_id', userId)
        .single();

      if (!profile || !['premium', 'basic'].includes(profile.subscription_plan || '')) {
        return new Response(JSON.stringify({ error: 'Premium subscription required' }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      let body: any;
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { factoryId } = body;

      if (!factoryId || typeof factoryId !== 'string' || !isValidUUID(factoryId)) {
        return new Response(JSON.stringify({ error: 'Valid Factory ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Check contact access rate limit
      const { data: rateLimitData, error: rateLimitError } = await serviceClient
        .rpc('check_contact_rate_limit', { p_user_id: userId });

      if (rateLimitError) {
        console.error('Rate limit check error:', rateLimitError);
        return new Response(JSON.stringify({ error: 'Rate limit check failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const rateLimit = rateLimitData?.[0];
      if (!rateLimit?.allowed) {
        const resetAt = rateLimit?.reset_at ? new Date(rateLimit.reset_at) : new Date();
        const retryAfterSeconds = Math.ceil((resetAt.getTime() - Date.now()) / 1000);
        
        return new Response(JSON.stringify({ 
          error: 'Daily contact access limit exceeded',
          retryAfter: retryAfterSeconds
        }), {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfterSeconds)
          },
        });
      }

      const { data: factory, error } = await supabase
        .from('factories')
        .select('contact_email, contact_phone')
        .eq('id', factoryId)
        .single();

      if (error || !factory) {
        return new Response(JSON.stringify({ error: 'Factory not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Log access for audit
      await serviceClient
        .from('contact_access_log')
        .upsert({ user_id: userId, factory_id: factoryId, accessed_at: new Date().toISOString() });

      console.log(`User ${userId} accessed contact info for factory ${factoryId}`);

      return new Response(JSON.stringify({ data: factory, remaining: rateLimit.remaining }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Send message
    if (path === '/send-message' && req.method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const supabase = getSupabaseClient(authHeader);
      const serviceClient = getServiceClient();
      const token = authHeader.replace('Bearer ', '');
      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const userId = claimsData.claims.sub;
      
      let body: any;
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { factoryId, message } = body;

      // Validate factoryId
      if (!factoryId || typeof factoryId !== 'string' || !isValidUUID(factoryId)) {
        return new Response(JSON.stringify({ error: 'Valid Factory ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Validate message
      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Message must be a string' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const trimmedMessage = message.trim();
      if (trimmedMessage.length === 0) {
        return new Response(JSON.stringify({ error: 'Message cannot be empty' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
        return new Response(JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Check message rate limit
      const { data: rateLimitData, error: rateLimitError } = await serviceClient
        .rpc('check_message_rate_limit', { p_user_id: userId });

      if (rateLimitError) {
        console.error('Rate limit check error:', rateLimitError);
        return new Response(JSON.stringify({ error: 'Rate limit check failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const rateLimit = rateLimitData?.[0];
      if (!rateLimit?.allowed) {
        const resetAt = rateLimit?.reset_at ? new Date(rateLimit.reset_at) : new Date();
        const retryAfterSeconds = Math.ceil((resetAt.getTime() - Date.now()) / 1000);
        
        return new Response(JSON.stringify({ 
          error: 'Daily message limit exceeded',
          retryAfter: retryAfterSeconds
        }), {
          status: 429,
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'Retry-After': String(retryAfterSeconds)
          },
        });
      }

      // Sanitize message content
      const sanitizedMessage = sanitizeText(trimmedMessage, MAX_MESSAGE_LENGTH);

      // Find or create conversation
      let conversationId: string;

      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', userId)
        .eq('factory_id', factoryId)
        .single();

      if (existingConv) {
        conversationId = existingConv.id;
      } else {
        const { data: newConv, error: convError } = await supabase
          .from('conversations')
          .insert({
            user_id: userId,
            factory_id: factoryId,
            type: 'factory_chat',
          })
          .select()
          .single();

        if (convError || !newConv) {
          console.error('Error creating conversation:', convError);
          return new Response(JSON.stringify({ error: 'Failed to create conversation' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        conversationId = newConv.id;
      }

      // Insert message with sanitized content
      const { data: msgData, error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          sender_type: 'user',
          content: sanitizedMessage,
        })
        .select()
        .single();

      if (msgError) {
        console.error('Error sending message:', msgError);
        return new Response(JSON.stringify({ error: 'Failed to send message' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Update conversation last_message_at
      await supabase
        .from('conversations')
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', conversationId);

      console.log(`User ${userId} sent message to factory ${factoryId}`);

      return new Response(JSON.stringify({ 
        data: { conversationId, message: msgData },
        remaining: rateLimit.remaining 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create order
    if (path === '/create-order' && req.method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const supabase = getSupabaseClient(authHeader);
      const token = authHeader.replace('Bearer ', '');
      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const userId = claimsData.claims.sub;
      
      let body: any;
      try {
        body = await req.json();
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid request body' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { factoryId, productName, productDescription, quantity, notes } = body;

      // Validate productName
      if (!productName || typeof productName !== 'string') {
        return new Response(JSON.stringify({ error: 'Product name is required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const sanitizedProductName = sanitizeText(productName, MAX_PRODUCT_NAME_LENGTH);
      if (sanitizedProductName.length === 0) {
        return new Response(JSON.stringify({ error: 'Product name cannot be empty' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Validate quantity
      if (!quantity || typeof quantity !== 'number' || quantity < 1 || quantity > 1000000) {
        return new Response(JSON.stringify({ error: 'Quantity must be between 1 and 1,000,000' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Validate factoryId if provided
      if (factoryId && (typeof factoryId !== 'string' || !isValidUUID(factoryId))) {
        return new Response(JSON.stringify({ error: 'Invalid Factory ID format' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Sanitize optional fields
      const sanitizedDescription = productDescription 
        ? sanitizeText(productDescription, MAX_DESCRIPTION_LENGTH) 
        : null;
      const sanitizedNotes = notes 
        ? sanitizeText(notes, MAX_NOTES_LENGTH) 
        : null;

      const { data: order, error } = await supabase
        .from('import_orders')
        .insert({
          user_id: userId,
          factory_id: factoryId || null,
          product_name: sanitizedProductName,
          product_description: sanitizedDescription,
          quantity: quantity,
          notes: sanitizedNotes,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating order:', error);
        return new Response(JSON.stringify({ error: 'Failed to create order' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Create initial timeline entry
      await supabase.from('order_timeline').insert({
        order_id: order.id,
        status: 'created',
        description: 'تم إنشاء الطلب',
      });

      console.log(`User ${userId} created order ${order.id}`);

      return new Response(JSON.stringify({ data: order }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Cleanup endpoint (for scheduled jobs)
    if (path === '/cleanup-expired-searches' && req.method === 'POST') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const supabase = getSupabaseClient(authHeader);
      const token = authHeader.replace('Bearer ', '');
      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const serviceClient = getServiceClient();
      
      // Call cleanup function
      const { data, error } = await serviceClient.rpc('cleanup_expired_searches');
      
      if (error) {
        console.error('Cleanup error:', error);
        return new Response(JSON.stringify({ error: 'Cleanup failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Also reset daily quotas
      await serviceClient.rpc('reset_daily_quotas');

      console.log(`Cleanup completed: ${data} expired searches deleted`);

      return new Response(JSON.stringify({ deleted: data }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // 404 for unknown routes
    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});