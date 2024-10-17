

/**
 * Extracts lyrics from the Genius API response.
 * This assumes the Genius API responds with a JSON object containing the lyrics.
 *
 * @param apiResponse - The response data from the Genius API containing lyrics.
 * @returns The extracted lyrics as a string, or null if no lyrics were found.
 */


// extractLyrics.ts
import axios from 'axios';
import Auth from '../utils/auth';

/**
 * Extracts lyrics from the Genius API response by fetching the song.
 * @param apiKey - Genius API Key.
 * @param title - Song title.
 * @param artist - Artist name.
 * @returns The extracted lyrics as a string, or null if no lyrics were found.
 */
import { useEffect, useState } from 'react';


interface lyricsProps {
  title: string,
  artist: string,
}
export default function extractLyrics({ title, artist }: lyricsProps) {
  const [lyricsUrl, setLyricsUrl] = useState<string | null>(null);
  console.log(title, artist);
  const fetch_lyrics = async () => {
    try {
      // Construct the Genius search API URL
      //const searchUrl = `https://api.genius.com/search?q=${encodeURIComponent(
      const data = {
        title: title,
        artist: artist,
      }

      // Make the request to the Genius API to search for the song
      const response = await axios.post('/api/reviews/lyrics', data, {
        headers: {
          Authorization: `Bearer ${Auth.getToken()}`,
        },
      });

      //const hits = response.data.response.hits;
      //console.log(hits);
      setLyricsUrl(response.data.lyrics);
    } catch (error) {
      console.error("Error fetching lyrics from Genius:", error);
      return null;
    }
  }
  useEffect(() => {
    fetch_lyrics()
  });
  return (
    <div>
      <a href={lyricsUrl ?? ''} target="_blank" rel="noreferrer">
        View Lyrics
      </a>
    </div>
  )
}

/**
 * Extracts lyrics from the HTML content of the Genius page.
 * You might need a scraping tool like Cheerio if you're not using the official API for lyrics.
 */
function extractLyricsFromHtml(htmlContent: string): string | null {
  // Example: Extracting lyrics using Cheerio or Regex from HTML
  const regex = /<div class="lyrics">([^<]+)<\/div>/; // Regex to match lyrics in HTML
  const matches = htmlContent.match(regex);
  return matches ? matches[1] : null;
}