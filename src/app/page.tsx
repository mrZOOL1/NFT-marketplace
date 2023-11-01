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
    <main className='flex flex-col items-center'>

      <SearchBar/>

      <div className="flex flex-col items-center p-10">
        <h1 className="text-3xl font-semibold mb-4">Featured</h1>
        <AllCards search={search}/>
      </div>
      
    </main>
  )
}
