import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Typography from "@mui/material/Typography";

const BrowseTodos = () => {
  const [update, setUpdate] = useState(false);
  const {folder_name = ''} =useParams()
  function updateList() {
    setUpdate(!update);
  }
  return (
    <div>
      <Typography variant="h3">Browsing {folder_name}</Typography>
      <TodoList shouldUpdate={update} updateFunc={updateList} folderName={folder_name}></TodoList>
      <AddTodo updateList={updateList} currentFolder={folder_name}></AddTodo>
    </div>
  );
};

export default BrowseTodos;
