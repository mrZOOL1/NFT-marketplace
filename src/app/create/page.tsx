import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import CreateForm from '@/components/CreateForm';

const page = async () => {

  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>
      <CreateForm email={session.user!.email!}/>
    </main>
  )
}

export default page