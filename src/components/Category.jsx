import { useRef, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Category = ({ categories = [], storeName }) => {
  const scrollRef = useRef(null);
  const autoScrollActive = useRef(true);
  const scrollDirection = useRef(1);
  const intervalRef = useRef(null);
  const resumeTimer = useRef(null);

  const CLOUDINARY_BASE_URL =
    "https://res.cloudinary.com/djpayyzvm/image/upload/";
  const storeLabel = storeName === "ExtraBakes" ? "Bakes" : "Mart";

  // Pause auto-scroll
  const pauseAutoScroll = () => {
    autoScrollActive.current = false;
    clearInterval(intervalRef.current);
    clearTimeout(resumeTimer.current);
  };

  // Resume auto-scroll after delay
  const resumeAutoScrollAfterDelay = (delay = 3000) => {
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      autoScrollActive.current = true;
      startAutoScroll();
    }, delay);
  };

  // Manual scroll buttons
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    pauseAutoScroll();
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
    resumeAutoScrollAfterDelay();
  };

  // 🌀 Start auto-scroll
  const startAutoScroll = () => {
    const container = scrollRef.current;
    if (!container || !categories.length) return;

    clearInterval(intervalRef.current);
    const scrollStep = 1;
    const intervalSpeed = 20;

    intervalRef.current = setInterval(() => {
      if (!autoScrollActive.current) return;

      container.scrollLeft += scrollStep * scrollDirection.current;

      // Reverse direction at ends
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        scrollDirection.current = -1;
      } else if (container.scrollLeft <= 0) {
        scrollDirection.current = 1;
      }
    }, intervalSpeed);
  };

  // Initialize auto-scroll
  useEffect(() => {
    const INITIAL_DELAY = 2000; // wait before first scroll
    const timer = setTimeout(() => startAutoScroll(), INITIAL_DELAY);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalRef.current);
      clearTimeout(resumeTimer.current);
    };
  }, [categories]);

  // Pause on user interaction
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const stopScroll = () => {
      pauseAutoScroll();
      resumeAutoScrollAfterDelay();
    };

    container.addEventListener("touchstart", stopScroll);
    container.addEventListener("wheel", stopScroll);
    container.addEventListener("mousedown", stopScroll);
    container.addEventListener("touchmove", stopScroll);

    return () => {
      container.removeEventListener("touchstart", stopScroll);
      container.removeEventListener("wheel", stopScroll);
      container.removeEventListener("mousedown", stopScroll);
      container.removeEventListener("touchmove", stopScroll);
    };
  }, []);

  // 🎨 UI Styles
  const accentColor =
    storeLabel === "Mart" ? "text-green-600" : "text-orange-600";
  const hoverBg =
    storeLabel === "Mart" ? "hover:bg-green-100" : "hover:bg-orange-100";
  const iconColor =
    storeLabel === "Mart" ? "text-green-600" : "text-orange-600";
  const emoji = storeLabel === "Mart" ? "🛒" : "🍰";

  return (
    <div className="relative w-[90%] my-1 mx-auto py-7 sm:py-11 px-4 sm:px-8 bg-white overflow-visible">
      {/* 🟢 Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-gray-800 text-center">
        {emoji} Explore Our <span className={accentColor}>{storeLabel}</span>{" "}
        Collection
      </h2>

      {/* 🟢 Scroll Row */}
      <div className="relative flex items-center overflow-visible">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className={`hidden sm:flex absolute -left-3 md:-left-6 bg-white shadow-md rounded-full p-3 sm:p-4 ${hoverBg} hover:scale-110 transition-all duration-300 z-10 items-center justify-center`}
        >
          <FaChevronLeft className={`${iconColor} text-lg sm:text-xl`} />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex space-x-5 sm:space-x-7 overflow-x-scroll scroll-smooth no-scrollbar w-full py-2"
        >
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex-shrink-0 w-[180px] sm:w-[240px] md:w-[260px] lg:w-[280px] bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-100"
            >
              <div className="flex flex-col h-[220px] sm:h-[260px]">
                <img
                  src={`${CLOUDINARY_BASE_URL}${cat.imageId}`}
                  alt={cat.name}
                  className="w-full h-[65%] object-cover"
                />
                <div className="flex items-center justify-center h-[35%] bg-gray-50">
                  <p className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold text-center px-2">
                    {cat.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className={`hidden sm:flex absolute -right-3 md:-right-6 bg-white shadow-md rounded-full p-3 sm:p-4 ${hoverBg} hover:scale-110 transition-all duration-300 z-10 items-center justify-center`}
        >
          <FaChevronRight className={`${iconColor} text-lg sm:text-xl`} />
        </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Category;
