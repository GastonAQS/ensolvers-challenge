import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import todosApi from "../api/todos";

interface Props {
  updateList: Function;
}

interface RequestBody {
  Name: string;
  Due_Date?: string | null;
}

const AddTodo = ({ updateList }: Props) => {
  const [todoDueDate, setTodoDueDate] = useState(null);
  const [dueDateError, setDueDateError] = useState(false);
  const [dueDateErrorMsg, setDueDateErrorMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [todoName, setTodoName] = useState("");

  function handleSubmit(event: any): any {
    setNameError(false);
    setNameErrorMsg("");
    setDueDateError(false);
    setDueDateErrorMsg("");
    var body: RequestBody = { Name: todoName };
    if (todoDueDate) {
      const dueDate = new Date(todoDueDate);
      body.Due_Date = `${dueDate.getDate()}/${
        dueDate.getMonth() + 1
      }/${dueDate.getFullYear()}`;
    }
    console.log(todoDueDate);
    event.preventDefault();
    todosApi
      .post("", body, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        setTodoDueDate(null);
        setTodoName("");
        updateList();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if ("Name" in err.response.data) {
            setNameError(true);
            setNameErrorMsg(err.response.data.Name.join(","));
          }
          if ("Due_Date" in err.response.data) {
            setDueDateError(true);
            setDueDateErrorMsg(err.response.data.Due_Date.join(","));
          }
        }
      });
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div>
        <TextField
          required={true}
          id="todo-name"
          label="Name"
          value={todoName}
          helperText={nameErrorMsg}
          error={nameError}
          placeholder="To do name"
          onChange={(e) => setTodoName(e.target.value)}
        />
        <DatePicker
          label="Due date"
          value={todoDueDate}
          onChange={(newValue) => {
            setTodoDueDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={dueDateError}
              helperText={dueDateErrorMsg}
            />
          )}
          inputFormat="dd/MM/yyyy"
        ></DatePicker>
      </div>
      <div>
        <Button type="submit">Add</Button>
      </div>
    </Box>
  );
};

export default AddTodo;
