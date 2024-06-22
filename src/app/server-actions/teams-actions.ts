"use server"
const baseURL = "http://localhost:3001/teams";
import { getAccessToken } from "@/lib/cookies";
export const TeamsList = async () => {
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

export const Team = async (id: string) => {
 
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseURL}/${id}`, {
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

export const CreateTeam = async (name: string) => {
  
  try {
    const accessToken = await getAccessToken();
    const response = await fetch(`${baseURL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({ name }),
    });


    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const DeleteTeam = async (id: string) => {
  
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