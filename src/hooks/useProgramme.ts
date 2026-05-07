// hooks/useProgramme.ts
import * as API from "../api/programme.api";
import { useData } from "../context/DataContext";

export const useProgramme = () => {
  const { setSummary } = useData();

  const getProgramme = async () => {
    const res = await API.getProgrammeSummary();
    setSummary(res.data);
  };

  const getInstitution = async (id: string) => {
    const res = await API.getInstitutionSummary(id);
    setSummary(res.data);
  };

  return { getProgramme, getInstitution };
};