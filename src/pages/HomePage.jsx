// src/pages/HomePage.jsx
import { Outlet } from "react-router-dom";
import Carousel from "../components/Carousel";
import Category from "../components/Category";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  return (
    <div className="relative">
      <Carousel />
      <SearchBar />
      <Category />
      <Category />

      {/* ✅ Popup appears here when route = /login */}
      <Outlet />
    </div>
  );
};

export default HomePage;
