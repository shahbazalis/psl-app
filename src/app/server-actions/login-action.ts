"use server";

export type LoginProps = {
  email: string;
  password: string;
};

const backendURL= process.env.DATA_BASE_URL
const baseURL = `${backendURL}/auth/login`;

export const LoginAction = async (props: LoginProps) => {
  const email = props.email.toLowerCase();
  const password = props.password;
  try {
    const response = await fetch(`${baseURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};
