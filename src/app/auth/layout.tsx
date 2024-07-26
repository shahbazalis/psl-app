import Navbar from "@/components/Navbar";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen flex flex-col lg:flex-row overflow-auto lg:overflow-hidden">
      <div>
        <Image
          src="/images/psl.png"
          alt="banner"
          layout="responsive"
          width={1280}
          height={720}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col">
        <Navbar />
        <div className="flex flex-grow items-center justify-center overflow-auto p-4">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
