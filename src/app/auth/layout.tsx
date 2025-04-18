
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import LoadingComponent from "@/components/loader";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Side Image with Loader Overlay */}
      <div className="relative w-full lg:w-1/2 h-60 sm:h-72 md:h-80 lg:h-full">
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
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </div>

      {/* Right Side Content */}
      <div className="w-full lg:w-1/2 flex flex-col h-full">
        <Navbar />
        <div className="flex flex-grow items-center justify-center p-4 overflow-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;