"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/register-form";
import { AlertDialogComponent } from "@/components/alert-dialog";

const Register = () => {
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowDialog(true);
  }, []);

  const handleRegistrationOver = async () => {
    setShowDialog(false);
    router.push("/players");
  };
  
  return (
    <>
      <RegisterForm />
      {/* <AlertDialogComponent
        showDialog={showDialog}
        onClose={handleRegistrationOver}
        title="Sorry!"
        description="Registration time period is over. Please try again next time."
        handleConfirmation={handleRegistrationOver}
      /> */}
    </>
  );
};

export default Register;
