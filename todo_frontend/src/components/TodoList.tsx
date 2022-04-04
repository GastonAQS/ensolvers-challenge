import React, { useEffect, useState } from "react";
import todos from "../api/todosApi";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import TodoItem from "./TodoItem";
import TodoType from "../types/TodoType";

interface Props {
  shouldUpdate: boolean;
  updateFunc: Function;
}

const TodoList = ({ shouldUpdate, updateFunc }: Props) => {
  const [todoState, setTodosState] = useState<Array<TodoType>>();

  const deleteItem = (id: number) => {
    todos.delete(`/${id}/`).then((response) => {
      updateFunc(!shouldUpdate);
    });
  };

  const toggleCheckItem = (id: number, val: boolean) => {
    todos
      .put(`/${id}/`, {
        Completed: val,
      })
      .then((response) => {
        updateFunc(!shouldUpdate);
      });
  };

  useEffect(() => {
    todos.get("").then((response) => setTodosState(response.data));
  }, [shouldUpdate]);

  if (!todoState) {
    return <Typography>Loading...</Typography>;
  }

  if (todoState.length === 0) {
    return <Typography>No to do created yet. Create one below!</Typography>;
  }

  return (
    <React.Fragment>
      <List sx={{ maxWidth: "30%" }}>
        {todoState.map((todoItem, idx) => (
          <TodoItem
            key={idx}
            id={todoItem.id}
            Name={todoItem.Name}
            Due_Date={todoItem.Due_Date}
            Completed={todoItem.Completed}
            deleteItem={deleteItem}
            toggleCheckItem={toggleCheckItem}
            Expires_Soon={todoItem.Expires_Soon}
            Expired={todoItem.Expired}
          ></TodoItem>
        ))}
      </List>
    </React.Fragment>
  );
};

export default TodoList;
