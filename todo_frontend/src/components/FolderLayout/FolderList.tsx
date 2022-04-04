import React, {useState, useEffect} from 'react';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import FolderItem from './FolderItem';
import {FolderTypeOverview} from '../../types/FolderType'
import todosApi from '../../api/todosApi'

interface Props {
    shouldUpdate: boolean;
    updateFunc: Function;
  }

const FolderList = ({shouldUpdate, updateFunc}: Props) => {
    const [folders, setFolders] = useState<Array<FolderTypeOverview>>()

    const deleteFolder = (name: string) => {
        todosApi.delete(`${name}/`).then(response => updateFunc(!shouldUpdate))
    }


    useEffect(() => {
        todosApi.get("").then(response => setFolders(response.data))
    },[shouldUpdate])

    if(!folders){
        return <Typography>Loading...</Typography>
    }
    if(folders.length === 0){
        return <Typography>No folder created, create one below!</Typography>
    }
    return <List sx={{ maxWidth: "30%" }}>
        {folders.map((folder, idx) => <FolderItem key={idx} id={folder.id} Name={folder.Name} todo_count={folder.todo_count} deleteItem={deleteFolder}/>)}
    </List>
}

export default FolderList