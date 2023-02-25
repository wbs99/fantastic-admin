import { http } from "./http";

export const fetchJwtApi = (data: Login) => http.post<string>("/tokens", data)

export const fetchMeApi = () => http.get<Me>('users/me')