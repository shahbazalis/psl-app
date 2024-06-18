("user-server");
type UpdatePlayerParams = {
  id: string;
  status?: string;
  teamId?: string;
  name?: string;
  nationality?: string;
};

export const PlayersList = async () => {
  try {
    const response = await fetch("http://localhost:3001/players", {
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
export const DeletePlayer = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3001/players/${id}`, {
      method: "DELETE",
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

export const UpdatePlayer = async (
  id: string,
  status?: string,
  teamId?: string
) => {
  try {
    const response = await fetch(`http://localhost:3001/players/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, teamId }),
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
