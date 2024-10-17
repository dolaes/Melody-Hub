import { type FormEvent, useState, useEffect } from 'react';
import { Track } from '../interfaces/Track';
import { searchForTrackAPI } from '../spotify/Api';
import { useNavigate } from 'react-router-dom'; // Use for routing

const CLIENT_ID = "b2d05a20bd4941eb9dbb80d3244de974";
const CLIENT_SECRET = "3abe7e0378a94c2285d4c8a70fda61eb";

interface TrackSearchProps {
  onClose: () => void;
}

// Track Search Page
function TrackSearch({ onClose }: TrackSearchProps) {
  const [searchInput, setSearchInput] = useState<string>(''); // search input
  const [accessToken, setAccessToken] = useState<string>(''); // Spotify access token
  const [tracks, setTracks] = useState<Track[]>([]); // search results array

  const navigate = useNavigate(); // To navigate to the review page

  // Fetch Spotify API token
  useEffect(() => {
    const authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
      .catch(error => console.error('Error fetching the token:', error));
  }, []);

  const searchForTrack = async (event: FormEvent) => {
    event.preventDefault();
    const trackList = await searchForTrackAPI(accessToken, searchInput);
    if (trackList) {
      setTracks(trackList);
    }
  };

  // Handle track selection and navigate to review page
  const handleTrackSelection = (track: Track) => {
    navigate(`/review/${track.id}`, { state: { track } });
    onClose();
  };

  return (
    <div>
      <form onSubmit={(event) => searchForTrack(event)} className="max-w-md mx-auto flex items-center">
        <label htmlFor="track-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <input
          type="text"
          id="track-search"
          value={searchInput}
          className="block w-full p-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter a track name"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </form>

      {tracks.length > 0 && (
        <div className="flex flex-col gap-4 mx-auto p-4 max-w-lg">
          <h3 className="text-lg font-semibold text-gray-200">Search Results</h3>
          <ul>
            {tracks.map((track, index) => (
              <li
                key={index}
                onClick={() => handleTrackSelection(track)}  // Now the entire card is clickable
                className="flex items-center p-3 mb-3 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 cursor-pointer"
              >
                {/* Track Image */}
                <img
                  src={track.albumImageUrl}
                  alt={`${track.albumName} cover`}
                  className="w-12 h-12 rounded-lg object-cover mr-4"
                />

                {/* Track Info */}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-white">{track.trackName}</h4>
                  <p className="text-xs text-gray-300">
                    {track.albumName} by {track.artistName}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TrackSearch;
