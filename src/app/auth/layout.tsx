"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import NextImage from "next/image"; // Renamed to avoid conflict
import LoadingComponent from "@/components/loader";

const imageUrl = "https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/promo.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload image using DOM Image constructor
  useEffect(() => {
    const img = new window.Image(); // Ensure we're using browser's Image
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // Fail-safe
  }, []);

  if (!imageLoaded) {
    return (
      <div className="flex flex-col h-screen w-full items-center justify-center bg-white">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Image Side */}
      <div className="w-full lg:w-1/2 relative">
        <div className="w-full h-auto lg:h-screen">
          <NextImage
            src={imageUrl}
            alt="Banner"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          <div className="w-full mx-auto items-center justify-center flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

