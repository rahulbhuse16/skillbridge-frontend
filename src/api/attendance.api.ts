// api/attendance.api.ts
import API from "./axios";

export const markAttendance = (data: any) =>
  API.post("/attendance/mark", data);