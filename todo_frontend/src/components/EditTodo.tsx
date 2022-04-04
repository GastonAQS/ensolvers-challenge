import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import todosApi from "../api/todosApi";
import Checkbox from "@mui/material/Checkbox";

interface RequestBody {
  Name: string;
  Due_Date: string | null;
  Completed: boolean | undefined;
}

const EditTodo = () => {
  const [todoDueDate, setTodoDueDate] = useState<string | null>("");
  const [todoCompleted, setTodoCompleted] = useState<boolean>();
  const [todoName, setTodoName] = useState("");
  const [dueDateError, setDueDateError] = useState(false);
  const [dueDateErrorMsg, setDueDateErrorMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    todosApi.get(`/${id}/`).then((response) => {
      console.log(response.data);
      setTodoName(response.data.Name);
      setTodoDueDate(response.data.Due_Date);
      setTodoCompleted(response.data.Completed);
    });
  }, [id]);

  function handleSubmit(event: any): any {
    setNameError(false);
    setNameErrorMsg("");
    setDueDateError(false);
    setDueDateErrorMsg("");
    var body: RequestBody = {
      Name: todoName,
      Due_Date: null,
      Completed: todoCompleted,
    };

    if (todoDueDate) {
      const dueDate = new Date(todoDueDate);
      body.Due_Date = `${dueDate.getDate()}/${
        dueDate.getMonth() + 1
      }/${dueDate.getFullYear()}`;
    }
    console.log(todoDueDate);
    event.preventDefault();
    todosApi
      .put(`/${id}/`, body, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        navigate("/");
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

  if (!(todoName && todoDueDate && todoCompleted)) {
    return <Typography>Loading...</Typography>;
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
        ></DatePicker>
      </div>
      <div>
        <Checkbox
          checked={todoCompleted}
          onChange={(e) => setTodoCompleted(e.target.checked)}
        />
      </div>
      <div>
        <Button type="submit">Edit</Button>
        <Button onClick={() => navigate("/")}>Cancel</Button>
      </div>
    </Box>
  );
};

export default EditTodo;
