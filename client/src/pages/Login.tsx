import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api"; // ✅ Axios instance

// ✅ Replace with your images
import login1 from "../assets/images/login1.png";
import login2 from "../assets/images/login2.png";
import login3 from "../assets/images/login3.jpg";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const images = [login1, login2, login3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  // ✅ Auto-slide every 4s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/signin", { email, password });

      setToken(res.data.token)

      toast.success("Login successful!");

      // Redirect after success
      setTimeout(() => navigate("/add-products"), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-black/90">
      {/* ✅ Background Glow Effects */}
      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 20vw, 260px)",
          height: "clamp(150px, 22vw, 280px)",
          background: "#CCF575",
          opacity: 0.4,
          bottom: "5%",
          left: "-8%",
        }}
      />

      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 22vw, 270px)",
          height: "clamp(150px, 22vw, 270px)",
          background: "#4F59A8",
          opacity: 0.5,
          top: "12%",
          right: "-8%",
        }}
      />

      {/* ✅ Foreground Content */}
      <Header isLogin={true} />

      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-stretch">
        {/* ✅ Left side - Carousel */}
        <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(calc(50% - ${(currentIndex + 0.5) * 85}%))`,
              width: `${images.length * 85}%`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 flex justify-center items-center "
                style={{ width: "85%" }}
              >
                <div
                  className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden mx-2 shadow-2xl"
                  style={{
                    height: "744px",
                    borderRadius: "40px",
                  }}
                >
                  <img
                    src={img}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Right side - Form */}
        <div
          className="
            w-full md:w-1/2 
            flex flex-col justify-center items-center 
            px-6 sm:px-4 md:px-12 lg:px-16 py-20 md:py-12 
         backdrop-blur-md md:backdrop-blur-lg
          "
        >
          <div className="w-full">
            {/* ✅ Logo Section */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white text-black flex items-center justify-center font-bold rounded">
                <span className="text-xs sm:text-sm md:text-base">&lt;/&gt;</span>
              </div>
              <div>
                <h1 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-white">
                  Levitation
                </h1>
                <p className="text-[9px] sm:text-xs md:text-sm text-gray-400">
                  Infotech
                </p>
              </div>
            </div>

            {/* ✅ Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#CCF575] mb-6">
              Let the Journey Begin!
            </h1>
            <p className="text-gray-300 mb-8 text-sm sm:text-base">
              This is a basic login page created for the levitation assignment purpose.
            </p>

            {/* ✅ Form */}
            <form className="flex flex-col gap-5 sm:gap-6" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm mb-2 text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#CCF575]"
                />
                <p className="text-xs text-gray-400 mt-2">
                  This email will be displayed with your inquiry
                </p>
              </div>
              <div>
                <label className="block text-sm mb-2 text-white">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#CCF575]"
                />
              </div>

              {/* ✅ Buttons */}
              <div className="flex items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-800 text-[#CCF575] text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-md transition"
                >
                  Login now
                </button>
                <p className="text-gray-300 text-sm sm:text-base">
                  <a href="#">Forgot password?</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
