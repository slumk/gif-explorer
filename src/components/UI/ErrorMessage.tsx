interface ErrorMessageProps {
    message: string;
    retry?: () => void;
}

export default function ErrorMessage({ message, retry }: ErrorMessageProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-red-500 bg-red-50 rounded-lg max-w-md mx-auto my-4">
            <p className="font-medium mb-2">{message}</p>
            {retry && (
                <button
                    onClick={retry}
                    className="text-sm bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
