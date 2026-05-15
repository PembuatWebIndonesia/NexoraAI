import { createClient } from '@/lib/supabase-server';
import { apiError } from '@/lib/api-response';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
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

    const keyId = params.id;

    // Verify ownership
    const { data: key } = await supabase
      .from('api_keys')
      .select()
      .eq('id', keyId)
      .eq('user_id', user.id)
      .single();

    if (!key) {
      return Response.json(
        apiError('NOT_FOUND', 'API key not found', 404),
        { status: 404 }
      );
    }

    // Soft delete
    const { error } = await supabase
      .from('api_keys')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', keyId);

    if (error) {
      return Response.json(
        apiError('DB_ERROR', error.message, 400),
        { status: 400 }
      );
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    return Response.json(
      apiError('SERVER_ERROR', 'Internal server error', 500),
      { status: 500 }
    );
  }
}
