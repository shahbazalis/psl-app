"use server";
import { cookies } from "next/headers";

export const getCookie = async (cookieName: string) => {
  const cookie = cookies().get(cookieName);
  return cookie?.value || "";
};
export const setCookie = async (cookieName: string, value: string) => {
  cookies().set("cookieName", value, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict",
  });
};

export const deleteCookie = async (cookieName: string) => {
  cookies().delete(cookieName);
};
