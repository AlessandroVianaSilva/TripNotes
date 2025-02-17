"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Procurar
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[10px] pl-10 text-sm"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2"/>
    </div>
  );
}
