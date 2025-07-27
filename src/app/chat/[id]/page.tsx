import { auth } from '@/auth';
import Chat from '@/components/Chat';

export default async function Server() {
  const session = await auth();
  const userId = session?.user?.id;

  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_KEY || '';
  return <Chat userId={userId} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />;
}
