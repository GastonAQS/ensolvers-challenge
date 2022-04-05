import React, { useState } from "react";
import {FolderTypeOverview} from '../../types/FolderType'
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ListItemButton from "@mui/material/ListItemButton";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import FolderIcon from '@mui/icons-material/Folder';

interface Props extends FolderTypeOverview {
    deleteItem: Function
}

const FolderItem = ({Name, id, todo_count, deleteItem}: Props) => {
    const [open, setOpen] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleDisagree = () => {
        setOpen(false);
      };
    
      const handleAgree = () => {
        deleteItem(Name);
        setOpen(false);
      };

      const handleClick = () => {
          navigate(`/ensolvers-challenge/${Name}`)
      }

    return <React.Fragment>
    <ListItem
      secondaryAction={
        <ListItemIcon>
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </ListItemIcon>
      }
    >
      <ListItemButton role={undefined} onClick={handleClick} dense>
        <ListItemIcon>
          <FolderIcon></FolderIcon>
        </ListItemIcon>
        <ListItemText
          primary={`${Name} (${todo_count})`}
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
}

export default FolderItem