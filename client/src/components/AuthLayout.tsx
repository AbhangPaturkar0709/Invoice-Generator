import React from "react";
import ImageSlider from "./ImageSlider";

interface AuthLayoutProps {
  children: React.ReactNode;
  images: string[];
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, images }) => {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Left Form */}
      <div className="w-1/2 flex flex-col justify-center px-16">
        {children}
      </div>

      {/* Right Slider */}
      <div className="w-1/2 h-full">
        <ImageSlider images={images} />
      </div>
    </div>
  );
};

export default AuthLayout;
