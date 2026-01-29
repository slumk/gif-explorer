import { Gif } from "@/lib/giphy";
import GifItem from "../GifItem/GifItem";

interface GifGridProps {
    gifs: Gif[];
}

export default function GifGrid({ gifs }: GifGridProps) {
    if (gifs.length === 0) {
        return (
            <div className="text-center p-10 text-gray-500 text-lg">
                <p>No GIFs found. Try searching for something!</p>
            </div>
        );
    }

    return (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 w-full py-5 space-y-4">
            {gifs.map((gif) => (
                <div key={gif.id} className="break-inside-avoid mb-4">
                    <GifItem gif={gif} />
                </div>
            ))}
        </div>
    );
}
