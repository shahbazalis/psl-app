"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";
 
const Home = () => {
  console.log("Here in the Home Page")
  const router = useRouter();

  useEffect(() => {
    // Redirect to /auth/login
    router.push("/auth/login");
  }, [router]);

  return null; // You can also return a loading indicator here if you want
};

export default Home;
