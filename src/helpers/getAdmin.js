import { getDataFromToken } from "@/helpers/getDataFromToken";

export const getAdmin = async (req) => {
  const user = await getDataFromToken(req);
  if (!user || !user.isAdmin) {
    throw new Error("Unauthorized");
  }
  return user;
};
