import { useState } from "react";
import { FaUserCircle, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const cartCount = useSelector((state) => state.cart.items.length);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* 🌿 Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white shadow-md sticky top-0 z-50">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="App Logo" className="w-40 h-12 object-contain" />
        </div>

        {/* Right Side - Desktop */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Cart Icon (Desktop only) */}
          <div className="relative cursor-pointer">
            <FaShoppingCart size={22} className="text-green-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Auth */}
          {user ? (
            <FaUserCircle
              size={32}
              className="text-green-600 cursor-pointer hover:scale-110 transition-transform"
              title="Profile"
              onClick={() => dispatch(logout())}
            />
          ) : (
            <Link to="/login">
              <button className="bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-2 rounded-full shadow transition-all">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile - Hamburger Toggle */}
        <div className="flex items-center md:hidden">
          <button
            className="text-green-600 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300">
            <button className="text-green-600 font-medium hover:text-green-700">
              Home
            </button>
            <button className="text-green-600 font-medium hover:text-green-700">
              Offers
            </button>
            <button className="text-green-600 font-medium hover:text-green-700">
              Orders
            </button>
            <button className="text-green-600 font-medium hover:text-green-700">
              Contact
            </button>

            {/* ✅ Auth inside Hamburger */}
            {user ? (
              <button
                className="text-green-600 font-medium hover:text-green-700"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            ) : (
              <button className="text-green-600 font-medium hover:text-green-700">
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* 🛒 Floating Sticky Cart Button - Visible only on Mobile */}
      <div className="md:hidden">
        <div className="fixed bottom-5 right-5 z-50">
          <button className="relative bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all">
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
