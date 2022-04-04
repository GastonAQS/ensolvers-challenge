import axios from "axios";

const todosApi = axios.create({
  baseURL: "https://todo-backend-ensolvers.herokuapp.com/api/todo/",
  headers: { Accept: "application/json" },
});

export default todosApi;
