// hooks/useSession.ts
import * as API from "../api/session.api";
import { useData } from "../context/DataContext";

export const useSession = () => {
  const { setAttendance } = useData();

  const create = async (data: any) => {
    await API.createSession(data);
  };

  const getAttendance = async (id: string) => {
    const res = await API.getSessionAttendance(id);
    setAttendance(res.data);
  };

  return { create, getAttendance };
};