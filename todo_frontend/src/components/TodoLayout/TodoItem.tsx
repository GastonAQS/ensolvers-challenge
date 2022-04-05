import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import TodoType from "../../types/TodoType";

interface Props extends TodoType {
  deleteItem: Function;
  toggleCheckItem: Function;
  folderName: string
}

const TodoItem = ({
  id,
  Name,
  Due_Date,
  Completed,
  deleteItem,
  toggleCheckItem,
  Expired,
  Expires_Soon,
  folderName
}: Props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    deleteItem(id);
    setOpen(false);
  };

  const handleClick = () => {
    toggleCheckItem(id, !Completed);
  };

  return (
    <React.Fragment>
      <ListItem
        sx={{
          backgroundColor: Completed
            ? "#81c784"
            : Expired
            ? "#ef5350"
            : Expires_Soon
            ? "#dce775"
            : "none",
        }}
        secondaryAction={
          <ListItemIcon>
            <IconButton onClick={() => navigate(`/${folderName}/${id}`)}>
              <EditIcon></EditIcon>
            </IconButton>
            <IconButton onClick={handleClickOpen}>
              <DeleteIcon></DeleteIcon>
            </IconButton>
          </ListItemIcon>
        }
      >
        <ListItemButton role={undefined} onClick={handleClick} dense>
          <ListItemIcon>
            <Checkbox edge="start" checked={Completed} />
          </ListItemIcon>
          <ListItemText
            primary={Name}
            secondary={Due_Date ? Due_Date : "No due date"}
          />
        </ListItemButton>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{Name}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TodoItem;
