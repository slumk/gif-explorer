import Link from "next/link";
import Image from "next/image";
import { Gif } from "@/lib/giphy";

interface GifItemProps {
    gif: Gif;
}

export default function GifItem({ gif }: GifItemProps) {
    return (
        <Link
            href={`/gif?id=${gif.id}`}
            className="group relative block rounded-lg overflow-hidden bg-gray-100 transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative w-full h-auto flex">
                <Image
                    src={gif.images.fixed_height.url}
                    alt={gif.title || "GIF"}
                    width={parseInt(gif.images.fixed_height.width)}
                    height={parseInt(gif.images.fixed_height.height)}
                    className="w-full h-auto object-cover"
                    unoptimized // Giphy URLs are external
                />
            </div>
            {gif.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-white text-sm m-0 whitespace-nowrap overflow-hidden text-ellipsis">{gif.title}</p>
                </div>
            )}
        </Link>
    );
}
