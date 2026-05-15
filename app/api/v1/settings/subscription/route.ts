import { createClient } from '@/lib/supabase-server';
import { apiResponse, apiError } from '@/lib/api-response';

export async function GET(request: Request): Promise<Response> {
  try {
    const supabase = createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return Response.json(
        apiError('UNAUTHORIZED', 'Not authenticated', 401),
        { status: 401 }
      );
    }

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select()
      .eq('user_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      return Response.json(
        apiError('DB_ERROR', error.message, 400),
        { status: 400 }
      );
    }

    // Default to free tier if no subscription
    const sub = subscription || {
      tier: 'free',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    return Response.json(apiResponse(sub));
  } catch (error) {
    return Response.json(
      apiError('SERVER_ERROR', 'Internal server error', 500),
      { status: 500 }
    );
  }
}
