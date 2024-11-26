import AddingTravelPopup from "@/components/AddingTravelPopup";
import Search from "@/components/search";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";

  const session = await getServerSession(authOptions);
  const pageName = "Inicio";

  return (
    <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col space-y-2 px-4">
      <span className="font-bold text-3xl">{pageName}</span>
      {/* <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div> */}
      <div className="mt-4 flex items-center w-full justify-between gap-2 md:mt-8"> 
        {/* // "border-dashed border border-zinc-500 w-full h-12 rounded-lg" */}
        <Search placeholder="procurando..." />
        {/* <button className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-2 px-4 border border-blue-700 rounded">
          Adicionar
        </button> */}
        <AddingTravelPopup/>
      </div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg">
        test
      </div>
    </div>
  );
}
