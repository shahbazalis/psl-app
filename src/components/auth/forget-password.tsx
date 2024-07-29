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
import { ForgetPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertMessage } from "../Alert";
import { z } from "zod";
import {
  GetPlayerByEmail,
  ForgetPassword,
} from "@/app/server-actions/players-actions";
import Link from "next/link";

const FogretPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ForgetPasswordSchema>) => {
    const getPlayer = await GetPlayerByEmail(data.email);
    if (getPlayer.id) {
      const response = await ForgetPassword(getPlayer.id, data.password);
      if (response.email) {
        setLoading(true);
        router.push("/auth/login");
      } else {
        if (response.message) setErrorMessage(response.message);
        setLoading(false);
      }
    } else {
      setErrorMessage("No user with this email found.");
    }
  };

  const { pending } = useFormStatus();
  return (
    <CardWrapper label="Create new password" title="Forget Passoword">
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
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
            {loading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>

      <div className="mt-5">
        {errorMessage && <AlertMessage message={errorMessage} />}
      </div>
      {/* Additional content can go here */}
      <div className="flex justify-center items-center space-x-4 mt-4">
        <Link href="/auth/register" className="text-black hover:underline">
          Register
        </Link>
        <Link href="/auth/login" className="text-black hover:underline">
          Login
        </Link>
      </div>
    </CardWrapper>
  );
};

export default FogretPasswordForm;
