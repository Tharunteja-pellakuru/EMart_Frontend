import { useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Category = ({ categories = [], storeName }) => {
  const scrollRef = useRef(null);
  const CLOUDINARY_BASE_URL =
    "https://res.cloudinary.com/djpayyzvm/image/upload/";

  const storeLabel = storeName === "ExtraBakes" ? "Bakes" : "Mart";

  const autoScrollActive = useRef(true);
  const autoScrollTimer = useRef(null);

  // 🟢 Manual scroll using arrow buttons
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    // Pause auto-scroll on button click
    pauseAutoScroll();

    const scrollAmount = 300;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });

    // Resume auto-scroll after 3 seconds
    resumeAutoScrollAfterDelay();
  };

  // 🛑 Pause auto-scroll function
  const pauseAutoScroll = () => {
    autoScrollActive.current = false;
    if (autoScrollTimer.current) clearTimeout(autoScrollTimer.current);
  };

  // ⏳ Resume auto-scroll after delay
  const resumeAutoScrollAfterDelay = (delay = 3000) => {
    autoScrollTimer.current = setTimeout(() => {
      autoScrollActive.current = true;
    }, delay);
  };

  // 🟢 Auto-scroll setup
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollDirection = 1; // 1 = right, -1 = left
    const scrollStep = 1; // speed

    const interval = setInterval(() => {
      if (!autoScrollActive.current) return;

      container.scrollLeft += scrollStep * scrollDirection;

      // Reverse scroll direction at edges
      if (
        container.scrollLeft + container.clientWidth >= container.scrollWidth ||
        container.scrollLeft <= 0
      ) {
        scrollDirection *= -1;
      }
    }, 20);

    // 🟢 Handle touch events for mobile
    const handleTouchStart = () => {
      pauseAutoScroll();
    };
    const handleTouchEnd = () => {
      resumeAutoScrollAfterDelay();
    };

    // 🟢 Handle manual mouse scroll (desktop)
    const handleMouseDown = () => pauseAutoScroll();
    const handleMouseUp = () => resumeAutoScrollAfterDelay();
    const handleWheel = () => {
      pauseAutoScroll();
      resumeAutoScrollAfterDelay();
    };

    // Attach listeners
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("wheel", handleWheel);

    return () => {
      clearInterval(interval);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // 🟠 Dynamic colors & emoji
  const accentColor =
    storeLabel === "Mart" ? "text-green-600" : "text-orange-600";
  const hoverBg =
    storeLabel === "Mart" ? "hover:bg-green-100" : "hover:bg-orange-100";
  const iconColor =
    storeLabel === "Mart" ? "text-green-600" : "text-orange-600";
  const emoji = storeLabel === "Mart" ? "🛒" : "🍰";

  return (
    <div className="relative w-[90%] my-1 mx-auto py-7 sm:py-11 px-4 sm:px-8 bg-white overflow-visible">
      {/* 🟢 Dynamic Heading */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-gray-800 text-center">
        {emoji} Explore Our <span className={accentColor}>{storeLabel}</span>{" "}
        Collection
      </h2>

      {/* 🟢 Scrollable Category Row */}
      <div className="relative flex items-center overflow-visible">
        {/* Left button */}
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

        {/* Right button */}
        <button
          onClick={() => scroll("right")}
          className={`hidden sm:flex absolute -right-3 md:-right-6 bg-white shadow-md rounded-full p-3 sm:p-4 ${hoverBg} hover:scale-110 transition-all duration-300 z-10 items-center justify-center`}
        >
          <FaChevronRight className={`${iconColor} text-lg sm:text-xl`} />
        </button>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Category;
