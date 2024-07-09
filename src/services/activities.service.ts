import { TActivitySchema } from "../schemas/activities.schema";

const API_URL = import.meta.env.VITE_API_URL;

const addActivity = async (activity: TActivitySchema, token: string) => {
  const response = await fetch(`${API_URL}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(activity),
  });
  return response.json();
};

const getActivities = async (token: string, name?: string) => {
  const queryParams = name ? `?name=${name}` : "";
  const response = await fetch(`${API_URL}/activities${queryParams}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

const deleteActivity = async (id: string, token: string) => {
  const response = await fetch(`${API_URL}/activities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export { addActivity, getActivities, deleteActivity };
