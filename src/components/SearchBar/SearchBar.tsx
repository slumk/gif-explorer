"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";
    const [term, setTerm] = useState(initialQuery);
    const [debouncedTerm, setDebouncedTerm] = useState(initialQuery);

    // Sync internal state with URL if it changes externally (e.g. back button)
    useEffect(() => {
        setTerm(initialQuery);
    }, [initialQuery]);

    // Debounce logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(term);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [term]);

    // Effect to trigger search when debounced term changes
    useEffect(() => {
        // Only push if valid string (empty or not) AND it's different from current
        // We avoid pushing on initial load unless needed
        if (debouncedTerm !== initialQuery) {
            if (debouncedTerm.trim()) {
                router.push(`/?q=${encodeURIComponent(debouncedTerm.trim())}`);
            } else {
                router.push("/");
            }
        }
    }, [debouncedTerm, router, initialQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Immediate search on enter
        if (term.trim()) {
            router.push(`/?q=${encodeURIComponent(term.trim())}`);
        } else {
            router.push("/");
        }
    };

    return (
        <form
            className="flex w-full max-w-[600px] border border-gray-200 rounded-full overflow-hidden shadow-sm transition-shadow focus-within:shadow-md focus-within:border-blue-500"
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                className="flex-1 px-5 py-3 border-none text-base outline-none"
                placeholder="Search for GIFs..."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
            <button
                type="submit"
                className="flex items-center justify-center border-none bg-blue-500 text-white px-5 cursor-pointer hover:bg-blue-600 transition-colors"
                aria-label="Search"
            >
                <Search size={20} />
            </button>
        </form>
    );
}
