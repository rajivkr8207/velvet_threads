import api from "@/lib/axios";

export const registerAPI = async (data) => {
  const res = await api.post("/auth/register", data);
  return res;
};

export const loginAPI = async (data) => {
  const res = await api.post("/auth/login", data);
  return res;
};

export const fetchProfile = async () => {
  const res = await api.get("/auth/profile");
  return res.data;
};

export const fetchAuth = async () => {
  const res = await api.get("/auth/me");
  return res.userdata;
};

export const logoutAPI = async () => {
  const res = await api.get("/auth/logout");
  return res.data;
};
