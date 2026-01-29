const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
const API_URL = "https://api.giphy.com/v1/gifs";

export interface GifImage {
    url: string;
    width: string;
    height: string;
}

export interface Gif {
    id: string;
    title: string;
    alt_text?: string;
    images: {
        fixed_height: GifImage;
        original: GifImage;
    };
}

interface GiphyResponse {
    data: Gif[];
    pagination: {
        total_count: number;
        count: number;
        offset: number;
    };
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}

interface GiphySingleResponse {
    data: Gif;
    meta: {
        status: number;
        msg: string;
        response_id: string;
    };
}

export async function searchGifs(term: string, limit = 20, offset = 0): Promise<Gif[]> {
    if (!GIPHY_API_KEY) {
        console.error("Giphy API key is missing");
        return [];
    }

    if (!term.trim()) return [];

    try {
        const res = await fetch(
            `${API_URL}/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(
                term
            )}&limit=${limit}&offset=${offset}&rating=g`,
            { cache: "no-store" } // Ensure fresh results
        );

        if (!res.ok) {
            throw new Error("Failed to fetch GIFs");
        }

        const data: GiphyResponse = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error searching gifs:", error);
        return [];
    }
}

export async function getTrendingGifs(limit = 20, offset = 0): Promise<Gif[]> {
    if (!GIPHY_API_KEY) {
        console.error("Giphy API key is missing");
        return [];
    }

    try {
        const res = await fetch(
            `${API_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&offset=${offset}&rating=g`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!res.ok) {
            throw new Error("Failed to fetch trending GIFs");
        }

        const data: GiphyResponse = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching trending gifs:", error);
        return [];
    }
}

export async function getGif(id: string): Promise<Gif | null> {
    if (!GIPHY_API_KEY) return null;

    try {
        const res = await fetch(`${API_URL}/${id}?api_key=${GIPHY_API_KEY}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return null;
        }

        const data: GiphySingleResponse = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching gif:", error);
        return null;
    }
}
