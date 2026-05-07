// hooks/useBatch.ts
import * as API from "../api/batch.api";
import { useData } from "../context/DataContext";

export const useBatch = () => {
  const { setSummary } = useData();

  const create = async (data: any) => {
    await API.createBatch(data);
  };

  const invite = async (id: string) => {
    const res = await API.inviteBatch(id);
    return res.data;
  };

  const summary = async (id: string) => {
    const res = await API.getBatchSummary(id);
    setSummary(res.data);
  };

  return { create, invite, summary };
};