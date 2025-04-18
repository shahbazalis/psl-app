"use client";
import { useState, useEffect } from "react";
import RegisterForm from "@/components/auth/register-form";
import LoadingComponent from "@/components/loader";

const Register = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  
  if (loading) {
    return <LoadingComponent />;
  }
  return <RegisterForm />;
};

export default Register;
