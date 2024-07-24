"use client";

import CardWrapper from "./card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertMessage } from "../Alert";
import { LoginAction } from "@/app/server-actions/login-action";
import { z } from "zod";
import { setCookie } from "@/lib/cookies";
import { AlertDialogComponent } from "../alert-dialog";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    const response = await LoginAction(data);

    if (response.token && response.admin) {
      setLoading(true);
      await setCookie("accessToken", response.token);
      await setCookie("admin", response.admin);
      router.push("/home");
    } else {
      if (response.message) setErrorMessage(response.message);
      else {
        setShowDialog(true);
      }
      setLoading(false);
    }
  };

  const handleLoginConfirmation = async () => {
    setShowDialog(false); // Close the dialog after confirmation
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper
      label="Login to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register here."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="johndoe@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="******" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-800"
            disabled={pending}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>

      <div>
        <AlertDialogComponent
          showDialog={showDialog}
          onClose={handleDialogClose}
          title="Login Not Allowed"
          description="You are not allowed to log in. This action cannot be undone. Please contact support if you believe this is an error."
          handleConfirmation={handleLoginConfirmation}
        />
      </div>

      <div className="mt-5">
        {errorMessage && <AlertMessage message={errorMessage} />}
      </div>
    </CardWrapper>
  );
};

export default LoginForm;
