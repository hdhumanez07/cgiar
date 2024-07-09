import { IUserContext } from "../interfaces/user.interface";

export const falseUser: IUserContext["auth"] = {
  admin: {
    username: "hdhumanez",
    id: 1,
    role: "admin",
  },
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWIwMTBhOTk3MjNlYjI2YmY0YWRmNyIsImVtYWlsIjoiaGRodW1hbmV6QGdtYWlsLmNvbSIsImlhdCI6MTY0NjE0Nzk4MywiZXhwIjoxNjQ2MTUxNTgzfQ.7DoXAIwPBLgHLYd3QCHHHXaBgEzRZgv1D09pbv-q3y8",
};
