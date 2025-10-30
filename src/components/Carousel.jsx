import { useState, useEffect } from "react";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";
import Image4 from "../assets/Image4.png";

const images = [
  {
    src: Image1,
    title: "Fresh Groceries at ExtraMart",
    desc: "Shop daily essentials with unbeatable freshness.",
  },
  {
    src: Image2,
    title: "Delicious Bakery Treats",
    desc: "From bread to pastries, baked fresh every day.",
  },
  {
    src: Image3,
    title: "Snacks & Beverages",
    desc: "Grab your favorite chips, cookies, and drinks.",
  },
  {
    src: Image4,
    title: "Exclusive Offers & Discounts",
    desc: "Save more with ExtraMart’s special deals.",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[90%] mx-auto overflow-hidden rounded-2xl shadow-lg mt-6">
      {/* Slides */}
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="min-w-full h-[250px] md:h-[350px] relative"
          >
            <img
              src={img.src}
              alt={img.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-8 left-6 md:left-12 text-white drop-shadow-lg">
              <h2 className="text-lg md:text-2xl font-bold mb-1">
                {img.title}
              </h2>
              <p className="text-xs md:text-base">{img.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full transition-all ${
              current === i ? "bg-white scale-125" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
