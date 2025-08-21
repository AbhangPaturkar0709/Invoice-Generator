import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header: React.FC<{ isLogin?: boolean }> = ({ isLogin }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  // ✅ check if we’re on login/signup pages
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  const handleLogout = () => {
    setToken(null); // this will also remove from localStorage via AuthProvider
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between bg-gray-700/30 text-white px-4  sm:px-6 md:px-10 lg:px-16 py-2 sm:py-3 shadow-md">
      {/* Left side: Logo + Title */}
      <div className="flex items-center space-x-2 pr-10">
        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white text-black flex items-center justify-center font-bold rounded">
          <span className="text-xs sm:text-sm md:text-base">&lt;/&gt;</span>
        </div>
        <div>
          <h1 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
            Levitation
          </h1>
          <p className="text-[9px] sm:text-xs md:text-sm text-gray-400">
            Infotech
          </p>
        </div>
      </div>

      {/* Right side: Button */}
      {isAuthPage ? (
        isLogin ? (
          <Link
            to="/signup"
            className="border-2 border-[#CCF575] text-[#CCF575] 
              hover:bg-[#CCF575]/10 
              px-2 py-1 text-xs font-medium rounded-sm 
              sm:px-3 sm:py-1.5 sm:text-sm 
              md:px-4 md:py-2 md:text-base 
              lg:px-5 lg:py-2 lg:text-lg 
              transition truncate"
          >
            Connecting People with Technology
          </Link>
        ) : (
          <Link
            to="/login"
            className="bg-[#CCF575] hover:bg-[#b3d94d] text-black 
              px-2 py-1 text-xs font-medium rounded-sm 
              sm:px-3 sm:py-1.5 sm:text-sm 
              md:px-4 md:py-2 md:text-base 
              lg:px-5 lg:py-2 lg:text-lg 
              transition"
          >
            Login
          </Link>
        )
      ) : (
        <button
          onClick={handleLogout}
          className="bg-[#CCF575] hover:bg-[#b3d94d] text-black 
              px-2 py-1 text-xs font-medium rounded-sm 
              sm:px-3 sm:py-1.5 sm:text-sm 
              md:px-4 md:py-2 md:text-base 
              lg:px-5 lg:py-2 lg:text-lg 
              transition"
        >
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;
