("user-server");

export const RegisterAction = async (props: FormData) => {
  const email = props.get("email");
  const name = props.get("name");
  const phoneNumber = props.get("phoneNumber");
  const nationality = props.get("nationality");
  const role = props.get("role"); //"BATTER"; ..
  const password = props.get("password");
  console.log("Role:",role);
  console.log("phoneNumber:",phoneNumber);
  try {
    const response = await fetch("http://localhost:3001/players/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    return response;
  } catch (error: any) {
    return error;
  }
};
