// src/pages/Home.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";
import Mart from "../components/Mart";
import Bakes from "../components/Bakes"; // ✅ create a similar component for ExtraBakes

const Home = () => {
  const [activeTab, setActiveTab] = useState("ExtraMart");

  return (
    <div className="relative">
      <Carousel />
      <SearchBar onTabChange={setActiveTab} />

      {/* Conditionally render based on tab */}
      {activeTab === "ExtraMart" ? <Mart /> : <Bakes />}

      <Outlet />
    </div>
  );
};

export default Home;
