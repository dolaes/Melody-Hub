import axios, { AxiosResponse } from "axios";
import extractLyrics from "../components/extractLyrics";

// Define the structure for the song response
interface Song {
  id: string;
  full_title: string; // This is the correct property for the song title
  url: string;
  albumArt?: string; // Use albumArt as the final property, optional to prevent TypeScript errors
  lyrics?: string | null; // Allow lyrics to be string or null
}

// Function parameters type
export default async function songById(
  id: string,
  apiKey: string
): Promise<Song | null> {
  if (!id) throw new Error("No id was provided");
  if (!apiKey) throw new Error("No apiKey was provided");

  try {
    const { data }: AxiosResponse<{ response: { song: Song } }> =
      await axios.get(
        `https://api.genius.com/songs/${id}?access_token=${apiKey}`
      );

    // Log the song object to inspect its structure
    console.log(data); // Add this line to inspect the API response

    const song = data.response.song;
    const lyrics: string | null = await extractLyrics(song.url);

    return {
      id: song.id,
      full_title: song.full_title,
      url: song.url,
      albumArt: song.song_art_image_url || null, // Update this after inspecting the structure
      lyrics: lyrics || null, // This can be string or null
    };
  } catch (e) {
    throw e;
  }
}
