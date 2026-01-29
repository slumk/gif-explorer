"use client";

import ErrorMessage from "@/components/UI/ErrorMessage";
import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Something went wrong!</h2>
            <ErrorMessage
                message={error.message || "An unexpected error occurred."}
                retry={reset}
            />
        </div>
    );
}
