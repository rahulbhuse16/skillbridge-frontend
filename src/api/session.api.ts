// api/session.api.ts
import API from "./axios";

export const createSession = (data: any) =>
  API.post("/sessions", data);

export const getSessionAttendance = (id: string) =>
  API.get(`/sessions/${id}/attendance`);