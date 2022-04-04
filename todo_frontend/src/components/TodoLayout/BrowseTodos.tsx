import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Typography from "@mui/material/Typography";
import AppContext from '../../context/AppContext'

const BrowseTodos = () => {
  const ctx = useContext(AppContext)
  const [update, setUpdate] = useState(false);
  const {folder_name = ''} =useParams()
  function updateList() {
    setUpdate(!update);
  }
  return (
    <div>
      <Typography variant="h3">Browsing {folder_name}</Typography>
      <TodoList shouldUpdate={update} updateFunc={updateList} folderName={folder_name} token={ctx.user_auth_token}></TodoList>
      <AddTodo updateList={updateList} currentFolder={folder_name} token={ctx.user_auth_token}></AddTodo>
    </div>
  );
};

export default BrowseTodos;
