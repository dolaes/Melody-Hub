import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  // Define the search query state
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div>
      {/* Pass the handleSearch function as onSearch prop */}
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
