"use server";
import { Player } from "@/components/players/players-table";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";
import { getCookie } from "@/lib/cookies";
import { writeFile } from "fs/promises";
import { getSignedURL } from "./s3-bucket-actions";

const backendURL = process.env.DATA_BASE_URL;
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

export const PlayerRegistration = async (
  props: Partial<Player>,
  fileData: any
) => {
  const { email, name, phoneNumber, nationality, role, password } = props;

  const file = fileData.get("file");
  let newFileName = "";
  let s3URL: string | undefined;
  const originalFileName = file.name;
  const fileExtension = originalFileName.split(".").pop();
  if (name) {
    const sanitizedPlayerName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    newFileName = `${sanitizedPlayerName}.${fileExtension}`;
  }

  try {
    if (file) {
      const signedURLResult = await getSignedURL({
        fileName: newFileName,
        fileType: file.type,
        fileSize: file.size,
      });

      if (signedURLResult.success) {
        s3URL = signedURLResult.success.url;

        await fetch(s3URL, {
          method: "PUT",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });
      } else {
        console.error(`Error getting signed URL: ${signedURLResult.failure}`);
        return; // Exit if the signed URL failed
      }
    }

    const url = s3URL?.split("?")[0];
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
        url,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error: any) {
    console.log("error:", error);
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
  teamId?: string,
  price?: number,
  password?: string
) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, teamId, price, password }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const ForgetPassword = async (
  id: string,
  password: string
) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const GetPlayerByEmail = async (
  email: string,
) => {
  try {
    const response = await fetch(`${baseURL}/email/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
