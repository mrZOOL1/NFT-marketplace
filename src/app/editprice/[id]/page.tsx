import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import EditForm from '@/components/EditForm';

const page = async ({
  searchParams,
}: {
  searchParams?: {
    defaultprice?: string;
  };
}) => {

  const oldprice = searchParams?.defaultprice || '';


  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>
      <EditForm oldprice={oldprice}/>
    </main>
  )
}

export default page