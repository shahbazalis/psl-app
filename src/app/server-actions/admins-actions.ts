"use server";

const baseURL = "http://localhost:3001/admins";
import { getCookie} from "@/lib/cookies";

export const AdminsList = async () => {
  try {
    const accessToken = await getCookie("accessToken");
    const response = await fetch(`${baseURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
      },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const AddAdmin= async (
  id: string
) => {
  try {
    const accessToken = await getCookie("accessToken");
    const admin = true;
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({ admin }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
