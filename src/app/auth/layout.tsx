// import Navbar from "@/components/Navbar";
// import Image from "next/image";

// const AuthLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <section className="h-screen flex flex-col lg:flex-row overflow-auto lg:overflow-hidden">
//       <div>
//         <Image
//           src={`https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/promo.jpg`}
//           alt="banner"
//           layout="responsive"
//           width={1280}
//           height={720}
//         />
//       </div>
//       <div className="w-full lg:w-1/2 flex flex-col">
//         <Navbar />
//         <div className="flex flex-grow items-center justify-center overflow-auto p-4">
//           {children}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthLayout;

// "use client";

// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import { useState } from "react";

// const AuthLayout = ({ children }: { children: React.ReactNode }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   return (
//     <section className="flex flex-col lg:flex-row h-screen overflow-hidden">
//       {/* Image Section */}
//       <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-full lg:w-1/2">
//         {!imageLoaded && (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
//             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
//           </div>
//         )}
//         <Image
//           src="https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/promo.jpg"
//           alt="banner"
//           fill
//           //className="object-cover"
//           priority
//           onLoadingComplete={() => setImageLoaded(true)}
//         />
//       </div>

//       {/* Content Section */}
//       <div className="flex flex-col w-full lg:w-1/2 h-full">
//         <Navbar />
//         <div className="flex flex-grow items-center justify-center overflow-auto p-4">
//           {children}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AuthLayout;

import Navbar from "@/components/Navbar";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/* Left Side Image */}
      <div className="relative w-full lg:w-1/2 h-60 sm:h-72 md:h-80 lg:h-full">
        <Image
          src="https://psl-s3-vercel-bucket.s3.us-east-2.amazonaws.com/promo.jpg"
          alt="Banner"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
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