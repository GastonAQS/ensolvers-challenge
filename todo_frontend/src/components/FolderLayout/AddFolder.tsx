import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import todosApi from "../../api/todosApi";

interface Props {
  updateList: Function;
}

interface RequestBody {
  Name: string;
}

const AddFolder = ({ updateList }: Props) => {
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [folderName, setFolderName] = useState("");

  function handleSubmit(event: any): any {
    event.preventDefault();
    setNameError(false);
    setNameErrorMsg("");
    var body: RequestBody = { Name: folderName };
    
    todosApi
      .post("", body, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        setFolderName("")
        updateList();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          if ("Name" in err.response.data) {
            setNameError(true);
            setNameErrorMsg(err.response.data.Name.join(","));
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
          id="folder-name"
          label="Name"
          value={folderName}
          helperText={nameErrorMsg}
          error={nameError}
          placeholder="Folder name"
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>
      <div>
        <Button type="submit">Add</Button>
      </div>
    </Box>
  );
};

export default AddFolder;
