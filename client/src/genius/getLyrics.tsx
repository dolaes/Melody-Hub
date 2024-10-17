import axios from "axios";
import searchSong from "./searchSong";
import extractLyricsFromApi from "../components/extractLyrics";
import extractLyrics from "./genius/extractLyrics";

// Define types
type SearchArg = { apiKey: string; title: string; artist: string };
type LyricsResult = string | null;

/**
 * Fetches lyrics from the Genius API or a fallback method.
 *
 * @param arg - Search arguments containing the API key, song title, and artist name.
 * @returns A promise that resolves to the lyrics as a string, or null if not found.
 */
export default async function getLyrics(arg: SearchArg): Promise<LyricsResult> {
  try {
    // Search for the song using the Genius API
    const results = await searchSong(arg);

    if (!results || results.length === 0) return null;

    // Fetch the lyrics URL from the song results
    const lyricsUrl = results[0].url;

    // Make a direct request to the Genius API to get lyrics
    const { data } = await axios.get(lyricsUrl);

    // Extract lyrics from the API response (use the Genius lyrics API endpoint)
    const lyrics = extractLyricsFromApi(data);

    return lyrics ? lyrics : null;
  } catch (e) {
    console.error("Error fetching lyrics:", e);
    throw e; // Let the error propagate as is
  }
}
