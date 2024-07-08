import React from "react";
import Navbar from "@/components/Navbar";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full">
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="h-screen flex items-center justify-center overflow-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
