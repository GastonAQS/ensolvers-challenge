import axios from "axios";

const todosApi = axios.create({
  baseURL: "http://localhost:8000/api/folder/",
  headers: { Accept: "application/json" },
});

export default todosApi;
