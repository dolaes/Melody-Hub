import axios from "axios";
import { checkOptions, getTitle } from "../utils/index.ts";

// Define interfaces for options and song results
interface SearchOptions {
  apiKey: string;
  title: string;
  artist: string;
  optimizeQuery?: boolean;
  authHeader?: boolean;
}

interface SongResult {
  id: string;
  full_title: string;
  url: string;
}

const searchUrl = "https://api.genius.com/search?q";

/**
 * Searches for a song on Genius using the provided options.
 *
 * @param options - The search options containing apiKey, title, and artist.
 * @returns A promise that resolves to a list of song results, or null if no results are found.
 */
export default async function searchSong(
  options: SearchOptions
): Promise<SongResult[] | null> {
  try {
    // Check the validity of the options passed
    checkOptions(options);

    // Destructure the options for easy access
    const {
      apiKey,
      title,
      artist,
      optimizeQuery = false,
      authHeader = false,
    } = options;

    // Ensure all required parameters are defined
    if (!apiKey || !title || !artist) {
      throw new Error("apiKey, title, and artist are required fields.");
    }

    // Generate the song search string
    const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;

    // Construct the search query URL
    const reqUrl = `${searchUrl}=${encodeURIComponent(song)}`;

    // Set the headers for the API request
    const headers: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
      
    };

    // Make the API request
    const { data } = await axios.get(reqUrl, { headers });

    // Check if any results were returned
    if (data.response.hits.length === 0) return null;

    // Map the response data to the SongResult interface
    const results: SongResult[] = data.response.hits.map((val: any) => ({
      id: val.result.id,
      full_title: val.result.full_title,
      url: val.result.url,
    }));

    // Return the song results
    return results;
  } catch (e) {
    console.error("Error during search:", e);
    throw e; // Let the error propagate as is
  }
}
