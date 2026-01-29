"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Gif, searchGifs, getTrendingGifs } from "@/lib/giphy";
import GifGrid from "../GifGrid/GifGrid";
import Loader from "../UI/Loader";
import ErrorMessage from "../UI/ErrorMessage";

interface GifFeedProps {
    initialQuery: string;
}

export default function GifFeed({ initialQuery }: GifFeedProps) {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const [initialized, setInitialized] = useState(false);

    // Ref for the intersection observer target
    const loaderRef = useRef<HTMLDivElement>(null);

    // Initial Fetch when query changes
    useEffect(() => {
        const fetchInitial = async () => {
            setIsLoading(true);
            setError(null);
            setOffset(0);
            try {
                let newGifs: Gif[] = [];
                if (initialQuery) {
                    newGifs = await searchGifs(initialQuery, 20, 0);
                } else {
                    // Start fresh with trending
                    newGifs = await getTrendingGifs(20, 0);
                }
                setGifs(newGifs);
                setOffset(newGifs.length);
                setHasMore(newGifs.length > 0);
                setInitialized(true);
            } catch (err) {
                console.error(err);
                setError("Failed to load GIFs.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitial();
    }, [initialQuery]);

    const loadMore = useCallback(async () => {
        if (isLoading || !hasMore || !initialized) return;

        setIsLoading(true);
        setError(null);

        try {
            let newGifs: Gif[] = [];
            // use offset directly
            if (initialQuery) {
                newGifs = await searchGifs(initialQuery, 20, offset);
            } else {
                newGifs = await getTrendingGifs(20, offset);
            }

            if (newGifs.length === 0) {
                setHasMore(false);
            } else {
                setGifs((prev) => [...prev, ...newGifs]);
                setOffset((prev) => prev + newGifs.length);
            }
        } catch (err) {
            setError("Failed to load more GIFs. Please check your connection.");
        } finally {
            setIsLoading(false);
        }
    }, [initialQuery, offset, isLoading, hasMore, initialized]);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading && initialized) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => observer.disconnect();
    }, [loadMore, hasMore, isLoading, initialized]);

    return (
        <div className="flex flex-col gap-8">
            <GifGrid gifs={gifs} />

            {isLoading && <Loader />}

            {error && <ErrorMessage message={error} retry={loadMore} />}

            {!isLoading && hasMore && (
                <div ref={loaderRef} className="h-10 w-full" />
            )}

            {!hasMore && gifs.length > 0 && !isLoading && (
                <p className="text-center text-gray-500 py-8">You've reached the end!</p>
            )}
        </div>
    );
}
