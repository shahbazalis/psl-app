
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import LoadingComponent from "@/components/loader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Image Side */}
      <div className="relative w-full lg:w-1/2 h-64 lg:h-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <LoadingComponent />
          </div>
        )}
        <Image
          src="https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/promo.jpg"
          alt="Banner"
          fill
          priority
          className="object-cover"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
          <div className=" w-full mx-auto items-center justify-center flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
