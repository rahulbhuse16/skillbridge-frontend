// api/programme.api.ts
import API from "./axios";

export const getInstitutionSummary = (id: string) =>
  API.get(`/institutions/${id}/summary`);

export const getProgrammeSummary = () =>
  API.get(`/programme/summary`);