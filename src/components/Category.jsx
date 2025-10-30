import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Category = () => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const categories = [
    {
      id: 1,
      name: "Fresh Produce",
      imageId: "v1761818304/Fresh_and_Healthy_k09gsj.png",
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      imageId: "v1761818303/DiaryProducts_uxeeyn.png",
    },
    {
      id: 3,
      name: "Meat, Fish & Poultry",
      imageId: "v1761818304/Meat_Fish_Poultry_asrbpx.png",
    },
    {
      id: 4,
      name: "Staples & Essentials",
      imageId: "v1761818305/Staples___Essentials_buvp5x.png",
    },
    {
      id: 5,
      name: "Masalas & Spices",
      imageId: "v1761818304/Masalas___Spices_pozzpo.png",
    },
    {
      id: 6,
      name: "Snacks & Branded Foods",
      imageId: "v1761818305/Snacks___Branded_Foods_lqgfbm.png",
    },
    { id: 7, name: "Beverages", imageId: "v1761818303/Beverages_u4vppu.png" },
    {
      id: 9,
      name: "Kitchen & Home Appliances",
      imageId: "v1761818304/Kitchen___Home_Appliances_lxdcbl.png",
    },
    { id: 10, name: "Home Care", imageId: "v1761818304/Home_Care_m7nbgz.png" },
    { id: 11, name: "Baby Care", imageId: "v1761818303/Baby_Care_snnxzo.png" },
    {
      id: 12,
      name: "Electricals & Lighting",
      imageId: "v1761818303/Electricals___Lighting_jaaw4q.png",
    },
  ];

  const CLOUDINARY_BASE_URL =
    "https://res.cloudinary.com/djpayyzvm/image/upload/";

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-[90%] my-1 mx-auto py-7 sm:py-11 px-4 sm:px-8 bg-white overflow-visible">
      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-gray-800 text-center">
        🛍️ Shop by <span className="text-green-600">Category</span>
      </h2>

      {/* Scroll Container */}
      <div className="relative flex items-center overflow-visible">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:flex absolute -left-3 md:-left-6 bg-white shadow-md rounded-full p-3 sm:p-4 hover:bg-green-100 hover:scale-110 transition-all duration-300 z-10 items-center justify-center"
        >
          <FaChevronLeft className="text-green-600 text-lg sm:text-xl" />
        </button>

        {/* Category List */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
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
                  loading="lazy"
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
          className="hidden sm:flex absolute -right-3 md:-right-6 bg-white shadow-md rounded-full p-3 sm:p-4 hover:bg-green-100 hover:scale-110 transition-all duration-300 z-10 items-center justify-center"
        >
          <FaChevronRight className="text-green-600 text-lg sm:text-xl" />
        </button>
      </div>

      {/* Hide scrollbar */}
      <style>{`
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
    </div>
  );
};

export default Category;
