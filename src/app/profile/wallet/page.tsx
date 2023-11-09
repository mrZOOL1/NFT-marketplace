import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import FundsForm from '@/components/FundsForm';
import { GetFunds } from '@/lib/prisma';

const page = async () => {

  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  const funds = await GetFunds(session.user!.email!);

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>
      <FundsForm email={session.user!.email!} funds={funds}/>
    </main>
  )
}

export default page