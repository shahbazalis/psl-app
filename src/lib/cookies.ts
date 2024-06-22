"use server";
import { cookies } from "next/headers";

export const getAccessToken = async () => {
  const accessToken = cookies().get("accessToken");
  return accessToken?.value || "";
};
export const setAccessToken = async (token: string) => {
  cookies().set("accessToken", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict",
  });
};

export const deleteAccessToken = async () => {
  cookies().delete("accessToken");
};
