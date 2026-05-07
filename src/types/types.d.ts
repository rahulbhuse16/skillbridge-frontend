export type Role =
  | "student"
  | "trainer"
  | "institution"
  | "manager"
  | "monitoring";

export interface User {
  name: string;
  role: Role;
}