("user-server");

export type LoginProps = {
  email: string;
  password: string;
};

export const LoginAction = async (props: LoginProps) => {
  const email = props.email;
  const password = props.password;
  try {
    const response = await fetch("http://localhost:3001/auth/login", {
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
