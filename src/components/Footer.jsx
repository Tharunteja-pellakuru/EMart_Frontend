import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import ExtraMartLogo from "../assets/ExtraMart.png";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 border-t border-gray-200 w-full">
      {/* ===== Top Section ===== */}
      <div
        className="
          max-w-6xl  /* ✅ slightly smaller for tablet */
          mx-auto 
          px-6 md:px-8 lg:px-12 
          py-12 
          grid 
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-y-12 gap-x-10 
          justify-items-center  /* ✅ horizontally center each column */
        "
      >
        {/* === Brand Info === */}
        <div className="flex flex-col items-center sm:items-center text-center">
          <img
            src={ExtraMartLogo}
            alt="ExtraMart Logo"
            className="w-32 sm:w-36 md:w-40 lg:w-44 mb-5 object-contain"
          />
          <p className="text-sm md:text-[15px] text-gray-600 leading-relaxed max-w-[320px] sm:max-w-[280px]">
            Your one-stop destination for groceries, bakery delights, and daily
            essentials. We deliver freshness, quality, and savings — right to
            your door.
          </p>
        </div>

        {/* === Quick Links === */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Quick Links
          </h3>
          <ul className="flex flex-wrap justify-center sm:flex-col sm:items-center md:items-start gap-x-4 gap-y-2 text-sm md:text-[15px]">
            {["Home", "Shop", "Bakery", "Offers", "Contact Us"].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-green-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* === Customer Support === */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Customer Support
          </h3>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm md:text-[15px]">
            {[
              "FAQs",
              "Returns & Refunds",
              "Shipping Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:text-green-600 transition-all duration-200 hover:translate-x-1 inline-block"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* === Contact Info === */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            Get in Touch
          </h3>

          <div className="flex flex-col items-center gap-y-1 text-sm md:text-[15px] text-gray-600 leading-relaxed">
            <p className="flex items-center gap-1">📍 Hyderabad, Telangana</p>
            <p className="flex items-center gap-1">📞 +91 98765 43210</p>
            <p className="flex items-center gap-1">✉️ support@extramart.com</p>
          </div>

          <div className="flex space-x-4 mt-5 justify-center">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social Link"
                  className="p-2.5 bg-green-100 rounded-full hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-sm"
                >
                  <Icon size={15} />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* ===== Divider ===== */}
      <div className="border-t border-gray-200"></div>

      {/* ===== Bottom Section ===== */}
      <div className="bg-white py-5 px-6 sm:px-8 text-center">
        <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-green-600">ExtraMart</span>. All
          rights reserved. | Built with ❤️ by{" "}
          <span className="font-semibold">Teja</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
