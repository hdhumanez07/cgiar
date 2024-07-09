import { IResponse } from "../interfaces/http.interface";
import { IUserContext } from "../interfaces/user.interface";
import { TLoginSchema, TAdminSchema } from "../schemas/admin.schema";

const API_URL = import.meta.env.VITE_API_URL;

async function signUp(data: TAdminSchema) {
  const response = await fetch(`${API_URL}/admin/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function login(
  data: TLoginSchema
): Promise<IResponse<IUserContext["auth"]>> {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export { signUp, login };
