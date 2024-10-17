import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Review } from '../interfaces/Review';
import ExtractLyrics from './extractLyrics';

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { track } = location.state; // Get the selected track from the TrackSearch component

  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  const handleSubmit = async () => {
    const review: Review = {
      trackId: track.id,
      trackName: track.trackName,
      albumName: track.albumName,
      artistName: track.artistName, 
      albumImageUrl: track.albumImageUrl,
      playerUri: track.playerUri,
      rating: rating,
      comment: comment,
    };
    // console.log("Review userId: " + review.userId);
    // console.log("Review songId: " + review.songId);
    console.log("Review rating: " + review.rating);
    console.log("Review comment: " + review.comment);
    console.log("");
    console.log("Song id: " + track.id);
    // TrackId is the foreign key in the Review table
    console.log("Song trackName: " + track.trackName);
    console.log("Song albumName: " + track.albumName);
    console.log("Song artistName: " + track.artistName);
    //console.log("Song playerUri: " + track.playerUri); not needed
    console.log("Song albumImageUrl: " + track.albumImageUrl);
    // Handle storing the review, e.g., update state or API call
    await fetch('/api/reviews/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
      },
      body: JSON.stringify(review),
    });
    navigate('/home'); // Redirect back to home after submitting
  };

  const handleCancel = () => {
    navigate('/home'); // Redirect back to home if review is canceled
  };

  const handleRatingClick = (rate: number) => {
    setRating(rate); // Update rating state based on the clicked star
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-10">
      {/* Card Container */}
      <div className="bg-white border border-gray-200 rounded-lg shadow max-w-2xl w-full p-6 dark:border-gray-700 dark:bg-gray-800 ">

        {/* Image and Track Info Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start ">
          <img
            className="object-cover w-full rounded-lg h-32 md:h-auto md:w-32 rounded-lg"
            src={track.albumImageUrl}
            alt={track.albumName}
          />

          <div className="flex flex-col justify-between p-4 leading-normal">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {track.trackName}
            </h3>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              <strong>Artist</strong>: {track.artistName}<br />
              <strong>Album</strong>: {track.albumName}
            </p>
          </div>
        </div>

        {/* Audio Player */}
        <iframe className="flex justify-center mt-4"
          src={`https://open.spotify.com/embed/track/${track.playerUri.split(':')[2]}`}
          width="300"
          height="80"
          allowTransparency={true}
          allow="encrypted-media"
          title="Spotify Player"
        ></iframe>

        {/* Lyrics */}
        <div className="mb-3 font-normal text-gray-900 dark:text-white pt-4">
          <ExtractLyrics title={track.trackName} artist={track.artistName} />
        </div>

        {/* Star Rating Section */}
        <div className="flex items-center mt-4">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-6 h-6 cursor-pointer ${index < rating ? 'text-yellow-300' : 'text-gray-300'}`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
              onClick={() => handleRatingClick((index + 1))}
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          ))}
          <span className="ms-2 text-sm font-medium dark:text-white">{rating} / 5</span>
        </div>

        {/* Comment Section */}
        <div className="mt-4 mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Comment:
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        {/* Button Section */}
        <div className="flex justify-between">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
