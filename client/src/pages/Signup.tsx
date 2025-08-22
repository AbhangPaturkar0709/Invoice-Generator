import React, { useState } from "react";
import signup1 from "../assets/images/signup1.png";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom"; // for navigation
import API from "../context/api";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

   const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/signup", { name, email, password });
      toast.success("Registration successful! Please login.");

      setName("");
      setEmail("");
      setPassword("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Background Glow Effects */}
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
          width: "clamp(150px, 20vw, 260px)",
          height: "clamp(150px, 22vw, 280px)",
          background: "#CCF575",
          opacity: 0.4,
          top: "2%",
          left: "38%",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl z-0"
        style={{
          width: "clamp(150px, 22vw, 270px)",
          height: "clamp(150px, 22vw, 270px)",
          background: "#4F59A8",
          opacity: 0.8,
          top: "12%",
          right: "-8%",
        }}
      />

      {/* Foreground */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header isLogin={false} />

        <div className="flex-1 flex flex-col justify-center md:flex-row">
          {/* Signup Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center px-4 sm:px-6 md:px-16 py-6 sm:py-10">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              Sign up to begin journey
            </h1>
            <p className="text-gray-300 mb-5 sm:mb-8 text-xs sm:text-sm md:text-base">
              This is basic signup page which is used for levitation assignment purpose.
            </p>

            <form className="flex flex-col gap-4 sm:gap-6" onSubmit={handleRegister}>
              <div>
                <label className="block text-xs sm:text-sm md:text-base mb-1 sm:mb-2 text-white">
                  Enter your name
                </label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 bg-white/10 border border-gray-600 text-white text-sm sm:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-[#CCF575]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm md:text-base mb-1 sm:mb-2 text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 bg-white/10 border border-gray-600 text-white text-sm sm:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-[#CCF575]"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm md:text-base mb-1 sm:mb-2 text-white">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-3 bg-white/10 border border-gray-600 text-white text-sm sm:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-[#CCF575]"
                />
              </div>

              <div className="flex items-center gap-3 sm:gap-5 mt-6 sm:mt-8">
                <button
                  type="submit"
                  className="bg-gray-700 hover:bg-gray-800 text-[#CCF575] text-xs sm:text-sm md:text-base font-medium px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 rounded-md transition"
                >
                  Register
                </button>
                <p className="text-gray-300 text-xs sm:text-sm md:text-base">
                  <a href="/login">Already have account?</a>
                </p>
              </div>
            </form>
          </div>

          {/* Right side image */}
          <div className="hidden md:block w-1/2 my-10">
            <img
              src={signup1}
              alt="Signup Visual"
              className="w-full h-full object-cover rounded-l-[40px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
