import { auth } from '@/auth';
import Dm from '@/components/Dm';

export default async function Server() {
  const session = await auth();
  const userId = session?.user?.id;

  const supabaseUrl = process.env.SUPABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_KEY || '';
  return <Dm userId={userId} supabaseUrl={supabaseUrl} supabaseKey={supabaseKey} />;
}
