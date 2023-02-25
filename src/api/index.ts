import { http } from "./http";

export const fetchJwtApi = (data: Login) => http.post<string>("/tokens", data)