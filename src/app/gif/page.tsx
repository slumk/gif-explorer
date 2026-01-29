"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getGif, Gif } from "@/lib/giphy";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, Suspense } from "react";
import Loader from "@/components/UI/Loader";

function GifDetailContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    const [gif, setGif] = useState<Gif | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchGif = async () => {
            try {
                setLoading(true);
                const data = await getGif(id);
                if (data) {
                    setGif(data);
                } else {
                    setError("GIF not found");
                }
            } catch (err) {
                console.error(err);
                setError("Failed to load GIF");
            } finally {
                setLoading(false);
            }
        };

        fetchGif();
    }, [id]);

    if (!id) {
        return (
            <div className="max-w-[1000px] mx-auto py-10 px-5 font-sans">
                <div className="text-center py-24">
                    <h2 className="text-2xl font-bold mb-4">No GIF ID provided</h2>
                    <Link href="/" className="text-blue-500 underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader />
            </div>
        );
    }

    if (error || !gif) {
        return (
            <div className="max-w-[1000px] mx-auto py-10 px-5 font-sans">
                <div className="text-center py-24">
                    <h2 className="text-2xl font-bold mb-4">{error || "GIF not found"}</h2>
                    <Link href="/" className="text-blue-500 underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-[1000px] mx-auto py-10 px-5 font-sans">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-black font-medium mb-8 transition-colors">
                <ArrowLeft size={20} />
                Back
            </Link>

            <div className="flex flex-col gap-8 items-center">
                <div className="w-full max-w-[800px] bg-gray-100 rounded-xl overflow-hidden flex justify-center items-center p-5 shadow-lg">
                    <Image
                        src={gif.images.original.url}
                        alt={gif.title || "GIF Detail"}
                        width={parseInt(gif.images.original.width)}
                        height={parseInt(gif.images.original.height)}
                        className="max-w-full h-auto rounded"
                        unoptimized
                        priority
                    />
                </div>

                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">{gif.title || "Untitled GIF"}</h1>
                </div>
            </div>
        </div>
    );
}

export default function GifDetailPage() {
    return (
        <Suspense fallback={<div className="flex justify-center p-10"><Loader /></div>}>
            <GifDetailContent />
        </Suspense>
    );
}
