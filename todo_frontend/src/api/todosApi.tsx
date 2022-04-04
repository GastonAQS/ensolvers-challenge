import axios from "axios";

const todosApi = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: { Accept: "application/json" },
});

export default todosApi;
