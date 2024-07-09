import { IUserContext } from "../../interfaces/user.interface";

export const USER_INITIAL_STATE: IUserContext["auth"] = {
  admin: {
    role: "",
    username: "",
    id: -1,
  },
  token: "",
};
