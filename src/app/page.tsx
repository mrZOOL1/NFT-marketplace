import AllCards from "@/components/AllCards"
import SearchBar from '../components/SearchBar'

export default function Home({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {

  const search = searchParams?.search || '';

  return (
    <main className='flex flex-col items-center min-h-[calc(100vh-5rem)] pb-4'>

      <SearchBar/>

      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold leading-[22px] mt-4 mb-8">Featured</h1>
        <AllCards search={search}/>
      </div>
      
    </main>
  )
}