/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

 
const Home = () => {
  const router = useRouter();
  useEffect(() => {
    // Redirect to /auth/login
    router.push("/auth/login");
  }, [router]);

  return null; // You can also return a loading indicator here if you want
};

export default Home;

