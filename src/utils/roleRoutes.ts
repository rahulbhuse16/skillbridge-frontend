import type { Role } from "../types/types";


export const getDashboardRoute = (role: Role) => {
  switch (role) {
    case "student":
      return "/student";
    case "trainer":
      return "/trainer";
    case "institution":
      return "/institution";
    case "manager":
      return "/manager";
    case "monitoring":
      return "/monitoring";
    default:
      return "/login";
  }
};


export const getUser=()=>{
  const intialUser=localStorage.getItem('user')
  const parsedUser=intialUser?JSON.parse(intialUser):null

  return {
    id : parsedUser.id,
    name : parsedUser.name,
    role : parsedUser.role
  }
}