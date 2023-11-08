import { getServerSession } from 'next-auth';
import {options} from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import CreateForm from '@/components/CreateForm';
import { FilterCardsByUserId } from '@/lib/prisma';

const page = async () => {

  const session = await getServerSession(options);
  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/');
  }
  if (session.user?.email === (null || undefined)) {
    redirect('/api/auth/signin?callbackUrl=/');
  }

  const mycards = await FilterCardsByUserId(session.user!.email!);
  const cardtitles = mycards.map(card => card.title);

  return (
    <main className='flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] py-4'>
      <CreateForm email={session.user!.email!} name={session.user.name} cardtitles={cardtitles}/>
    </main>
  )
}

export default page