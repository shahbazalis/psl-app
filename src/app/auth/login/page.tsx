"use client";
import { useState, useEffect } from "react";
import LoginForm from "@/components/auth/login-form";
import LoadingComponent from "@/components/loader";
const Login = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <LoadingComponent />;
  }
  return <LoginForm />;
};

export default Login;
