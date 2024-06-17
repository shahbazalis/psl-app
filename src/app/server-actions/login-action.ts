("user-server");

export const LoginAction = async (props: FormData) => {
  const email = props.get("email");
  const password = props.get("password");
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
    return response;
  } catch (error: any) {
    return error;
  }
};
