import React, { useEffect, useState } from "react";
import axios from "axios";
import HistoryCard from "./historyCard";

interface HistoryItem {
  id: number;
  songId: number;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  song: {
    id: number;
    trackId: string;
    trackName: string;
    artistName: string;
    albumName: string;
    albumImageUrl: string;
    playerUri: string;
  };
}

interface HistoryListProps {
  searchQuery: string; // Receive the search query from parent component
}

const HistoryList: React.FC<HistoryListProps> = ({ searchQuery }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    axios
      .get("/api/users/history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("id_token")}`,
        },
      })
      .then((response) => {
        setHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching history:", error);
      });
  }, []);

  // Filter history based on search query (trackName, artistName, albumName)
  const filteredHistory = history.filter((item) =>
    `${item.song.trackName} ${item.song.artistName} ${item.song.albumName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-start pl-6">
      {filteredHistory.map((item) => (
        <div className="max-w-lg w-full mb-4" key={item.id}>
          <HistoryCard historyItem={item} />
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
