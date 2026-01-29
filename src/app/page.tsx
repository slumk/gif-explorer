"use client";

import SearchBar from "@/components/SearchBar/SearchBar";
import GifFeed from "@/components/GifFeed/GifFeed";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/UI/Loader";

function HomeContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  return (
    <div className="min-h-screen px-5 max-w-[1200px] mx-auto font-sans">
      <header className="py-5 border-b border-gray-200 mb-10">
        <h1 className="text-2xl font-bold m-0 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">GIF Explorer</h1>
      </header>
      <main className="flex flex-col gap-8">
        <div className="flex justify-center w-full">
          <SearchBar />
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          {query ? `Results for "${query}"` : "Trending Now"}
        </h2>

        {/* 
            GifFeed will handle data fetching internally on the client.
            We pass the query so it knows what to fetch.
        */}
        <GifFeed initialQuery={query} />
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center p-10"><Loader /></div>}>
      <HomeContent />
    </Suspense>
  );
}
