import searchSong from "./searchSong.ts";
import extractLyrics from "../components/extractLyrics.tsx";
import { checkOptions } from "../utils/index.ts";

// Define types for options and the result
interface SongResult {
  id: string;
  full_title: string; // Based on how Genius API usually provides the title
  url: string;
  lyrics: string | null;
}

interface SearchOptions {
  apiKey: string;
  title: string;
  artist: string;
  [key: string]: any; // Can have dynamic keys depending on search parameters
}

export default async function getSong(
  options: SearchOptions
): Promise<SongResult | null> {
  try {
    checkOptions(options);
    const results = await searchSong(options);
    if (!results || results.length === 0) return null;

    const { id, full_title, url } = results[0]; // Destructure properties we expect from the API

    const lyrics = await extractLyrics(url);

    return {
      id,
      full_title,
      url,
      lyrics: lyrics || null, // Provide a fallback to null in case lyrics extraction fails
    };
  } catch (e) {
    throw e; // Handle errors explicitly
  }
}
