"use server";
import { Player } from "@/components/players/players-table";
import { Resend } from "resend";
import EmailTemplate from "@/components/email-template";
import { getCookie } from "@/lib/cookies";
import { writeFile } from "fs/promises";

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
) => {
  const { email, name, phoneNumber, nationality, role, password } = props;

  // const file = fileData.get("file");

  // if (!file) {
  //   return { message: "no image found", success: false };
  // }

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

    // Extracting file extension and setting the new file name
    // let newFileName = ""
    // const originalFileName = file.name;
    // const fileExtension = originalFileName.split(".").pop();
    // if(name) {
    //   const sanitizedPlayerName = name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    //   newFileName = `${sanitizedPlayerName}.${fileExtension}`;
    // }
    // // uploading image file
    // const byteData = await file.arrayBuffer();
    // const buffer = Buffer.from(byteData);
    // const path = `./public/players/${newFileName}`;
    // await writeFile(path, buffer);

    // returning data
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
  price?: number
) => {
  try {
    const accessToken = await getCookie("accessToken");
    const response = await fetch(`${baseURL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ status, teamId, price }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
