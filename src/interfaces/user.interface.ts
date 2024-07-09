export interface IUser {
  username: string;
  role: string;
}

export interface IUserContext {
  auth: {
    admin: {
      id: number;
      username: string;
      role: string;
    };
    token: string;
  };
  setAuth: (auth: IUserContext["auth"]) => void;
  search: string;
  setSearch: (search: string) => void;
}
