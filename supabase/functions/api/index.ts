import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Initialize Supabase client
const getSupabaseClient = (authHeader: string) => {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!,
    { global: { headers: { Authorization: authHeader } } }
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

      const body = await req.json();
      const { factoryId } = body;

      if (!factoryId) {
        return new Response(JSON.stringify({ error: 'Factory ID required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
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

      console.log(`User ${userId} accessed contact info for factory ${factoryId}`);

      return new Response(JSON.stringify({ data: factory }), {
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
      const token = authHeader.replace('Bearer ', '');
      const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);

      if (claimsError || !claimsData?.claims) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const userId = claimsData.claims.sub;
      const body = await req.json();
      const { factoryId, message } = body;

      if (!factoryId || !message) {
        return new Response(JSON.stringify({ error: 'Factory ID and message required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

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

      // Insert message
      const { data: msgData, error: msgError } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: userId,
          sender_type: 'user',
          content: message,
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

      return new Response(JSON.stringify({ data: { conversationId, message: msgData } }), {
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
      const body = await req.json();
      const { factoryId, productName, productDescription, quantity, notes } = body;

      if (!productName || !quantity) {
        return new Response(JSON.stringify({ error: 'Product name and quantity required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: order, error } = await supabase
        .from('import_orders')
        .insert({
          user_id: userId,
          factory_id: factoryId || null,
          product_name: productName,
          product_description: productDescription || null,
          quantity: quantity,
          notes: notes || null,
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
