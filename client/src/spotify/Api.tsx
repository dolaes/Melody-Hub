import { Track } from "../interfaces/Track";

// searches for 5 tracks according to the search query and returns them as an array of Track objects
export const searchForTrackAPI = async (accessToken: string, searchInput: string) => {
  const trackParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken,
    },
  };
  
  const trackData = await fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=track`, trackParameters)
    .then(response => response.json())
    .then(data => data.tracks.items.slice(0, 5))
    .catch(error => console.error('Error fetching tracks:', error));

  if (trackData) {
    const trackList: Track[] = trackData.map((track: any) => ({
      id: track.id,
      trackName: track.name,
      albumName: track.album.name,
      artistName: track.artists.map((artist: any) => artist.name).join(', '),
      playerUri: track.uri,
      albumImageUrl: track.album.images[0].url,
    }));

    return trackList;
  } else {
    console.log('No tracks found');
  }
};