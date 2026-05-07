// api/batch.api.ts
import API from "./axios";

export const createBatch = (data: any) =>
  API.post("/batches", data);

export const inviteBatch = (id: string) =>
  API.post(`/batches/${id}/invite`);

export const joinBatch = (token: string) =>
  API.post(`/batches/join`, { token });

export const getBatchSummary = (id: string) =>
  API.get(`/batches/${id}/summary`);