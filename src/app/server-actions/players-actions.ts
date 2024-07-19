"use server";
import { Player } from "../players/page";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";
import { getCookie } from "@/lib/cookies";

const backendURL= process.env.DATA_BASE_URL;
const baseURL = `${backendURL}/players`;

export const SendEmail = async (props: Partial<Player>) => {
  const name = props.name as string;
  const email = props.email as string;
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "PSL Registration",
      react: EmailTemplate({ name }),
    });
    return {
      error: null,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return {
      error: (error as Error).message,
      success: false,
    };
  }
};

export const PlayerRegistration = async (props: Partial<Player>) => {
  const email = props.email;
  const name = props.name;
  const phoneNumber = props.phoneNumber;
  const nationality = props.nationality;
  const role = props.role;
  const password = props.password;

  try {
    const accessToken = await getCookie("accessToken");
    const response = await fetch(`${baseURL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
    const accessToken = await getCookie("accessToken");
    const response = await fetch(`${baseURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
    const accessToken = await getCookie("accessToken");
    const response = await fetch(`${baseURL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
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
    const accessToken = await getCookie("accessToken");
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status, teamId }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
