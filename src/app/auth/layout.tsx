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