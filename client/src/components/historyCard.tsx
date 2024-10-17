import React, { useState } from "react";

interface HistoryItemProps {
  historyItem: {
    id: number;
    songId: number;
    rating: number;
    comment: string;
    createdAt: string;
    updatedAt: string;
    song: {
      trackName: string;
      artistName: string;
      albumName: string;
      albumImageUrl: string;
      playerUri: string;
    };
  };
}

const HistoryCard: React.FC<{
  historyItem: HistoryItemProps["historyItem"];
}> = ({ historyItem }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to control card expansion

  // Toggle the expansion of the card
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className="history-card p-6 bg-gray-800 rounded-lg shadow-lg mb-4 cursor-pointer max-w-lg mx-auto"
      onClick={toggleExpand}
    >
      {/* Album Image and Track Info */}
      <div className="flex items-center">
        <img
          src={historyItem.song.albumImageUrl}
          alt={`${historyItem.song.albumName} album cover`}
          className="w-24 h-24 rounded-lg mr-6"
        />

        {/* Song and Album Info */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white">
            {historyItem.song.trackName}
          </h3>
          <p className="text-gray-400">
            <strong>Artist</strong>: {historyItem.song.artistName}
            <br />
            <strong>Album</strong>: {historyItem.song.albumName}
          </p>
        </div>

        {/* Arrow Indicator for Toggle */}
        <svg
          className={`w-6 h-6 transform ${
            isExpanded ? "rotate-180" : "rotate-0"
          } text-white`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Conditional rendering: Details section, only visible when expanded */}
      {isExpanded && (
        <div className="mt-4">
          {/* Spotify Player */}
          <iframe
            src={`https://open.spotify.com/embed/track/${
              historyItem.song.playerUri.split(":")[2]
            }`}
            width="300"
            height="80"
            allow="encrypted-media"
            title="Spotify Player"
            className="mt-2"
          ></iframe>

          {/* Rating and Comment */}
          <div className="flex items-center mt-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-6 h-6 ${
                  index < historyItem.rating
                    ? "text-yellow-300"
                    : "text-gray-300"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
            <span className="ml-2 text-sm font-medium dark:text-white">
              {historyItem.rating} / 5
            </span>
          </div>

          {/* Comment Section */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-300">
              Comment:
            </label>
            <p className="block w-full p-4 text-gray-900 bg-gray-700 rounded-lg text-base dark:text-white">
              {historyItem.comment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
