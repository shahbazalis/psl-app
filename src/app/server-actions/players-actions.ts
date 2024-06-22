"use server";
import { Player } from "../players/page";
const baseURL = "http://localhost:3001/players";
import { getAccessToken } from "@/lib/cookies";
export const PlayerRegistration = async (props: Partial<Player>) => {
  const email = props.email;
  const name = props.name;
  const phoneNumber = props.phoneNumber;
  const nationality = props.nationality;
  const role = props.role;
  const password = props.password;

  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        email,
        name,
        phoneNumber,
        nationality,
        role,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
export const PlayersList = async () => {
  try {
    const accessToken = await getAccessToken();
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
export const DeletePlayer = async (id: string) => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
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

export const UpdatePlayer = async (
  id: string,
  status?: string,
  teamId?: string
) => {
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({ status, teamId }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
