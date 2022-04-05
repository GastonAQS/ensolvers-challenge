import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DatePicker from "@mui/lab/DatePicker";
import Button from "@mui/material/Button";
import todosApi from "../../api/todosApi";
import Checkbox from "@mui/material/Checkbox";
import AppContext from '../../context/AppContext'

interface RequestBody {
  Name: string;
  Due_Date: string | null;
  Completed: boolean | undefined;
}

const EditTodo = () => {
  const ctx = useContext(AppContext)
  const [todoDueDate, setTodoDueDate] = useState<string | null>("");
  const [todoCompleted, setTodoCompleted] = useState<boolean>();
  const [todoName, setTodoName] = useState("");
  const [dueDateError, setDueDateError] = useState(false);
  const [dueDateErrorMsg, setDueDateErrorMsg] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const navigate = useNavigate();
  const { folder_name,id } = useParams();

  useEffect(() => {
    todosApi.get(`/${folder_name}/${id}/`, {headers:{"Authorization": `Basic ${ctx.user_auth_token}`}}).then((response) => {
      setTodoName(response.data.Name);
      setTodoDueDate(response.data.Due_Date);
      setTodoCompleted(response.data.Completed);
    });
  }, [id, folder_name, ctx.user_auth_token]);

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
    event.preventDefault();
    todosApi
      .put(`/${folder_name}/${id}/`, body, { headers: { "Content-Type": "application/json", "Authorization": `Basic ${ctx.user_auth_token}`} })
      .then((response) => {
        navigate(`/${folder_name}`);
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

  if (!todoName) {
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
          inputFormat={"dd/MM/yyyy"}
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
        <Button onClick={() => navigate(`/${folder_name}`)}>Cancel</Button>
      </div>
    </Box>
  );
};

export default EditTodo;
