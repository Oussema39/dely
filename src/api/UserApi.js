import axios from "axios";

const baseUrl = "http://localhost:3030";

const targetUrl = (resource) => `${baseUrl}/${resource}`;

const getAllUsers = async (signal) =>
  await axios.get(`${baseUrl}/user`, { signal });

export const getUserByEmail = async (email) =>
  (await getAllUsers()).data.find(({ email: _email }) => _email === email);

export const getAllEmails = async (signal) =>
  (await getAllUsers(signal)).data?.map((user) => user.email);

export const register = async (user) => {
  const auth = (await axios.post(targetUrl("user"), user)).data;
  delete auth?.["password"];
  return auth;
};

export const login = async (user) => {
  const data = (await getAllUsers()).data;
  const auth =
    data?.find(
      (_user) => _user.email === user.email && _user.password === user.password
    ) || null;
  delete auth?.["password"];
  return auth;
};
