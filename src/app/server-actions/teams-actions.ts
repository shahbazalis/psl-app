("user-server");
const baseURL = "http://localhost:3001/teams"
export const TeamsList = async () => {
  try {
    const response = await fetch(`${baseURL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

export const Team = async (id: string) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error;
  }
};

