"use client";

import ErrorMessage from "@/components/UI/ErrorMessage";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="flex min-h-screen flex-col items-center justify-center bg-white">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Critical Error</h2>
                    <ErrorMessage
                        message="A critical error occurred. Please refresh the page."
                        retry={() => window.location.reload()}
                    />
                    {process.env.NODE_ENV === 'development' && (
                        <p className="mt-4 text-gray-500 text-sm max-w-lg text-center break-words">
                            {error.message}
                        </p>
                    )}
                </div>
            </body>
        </html>
    );
}
