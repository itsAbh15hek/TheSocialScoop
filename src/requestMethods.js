import axios from "axios";
const BASE_URL = "https://the-social-scoop.herokuapp.com/api/";
// const TOKEN = localStorage.getItem("persist:root")
//   ? JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user)
//       ?.currentUser?.accessToken
//   : "";
const TOKEN = "45a1sfd4as65d465";
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Barer ${TOKEN}` },
});
