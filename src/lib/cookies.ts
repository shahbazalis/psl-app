"use server";
import { cookies } from "next/headers";

export const getCookie = async (cookieName: string) => {
  const cookie = cookies().get(cookieName);
  return cookie?.value || "";
};
export const setCookie = async (cookieName: string, value: any) => {
  cookies().set(cookieName, value, {
    httpOnly: true,
    maxAge: 24 * 60 * 60,
    sameSite: "strict",
  });
};

export const deleteCookies = async (cookieNames: string[]) => {
  cookieNames.forEach((cookieName) => {
    cookies().delete(cookieName);
  });
};
