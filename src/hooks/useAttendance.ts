// hooks/useAttendance.ts
import * as API from "../api/attendance.api";

export const useAttendance = () => {
  const mark = async (data: any) => {
    await API.markAttendance(data);
  };

  return { mark };
};