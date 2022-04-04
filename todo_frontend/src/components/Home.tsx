import React, {useState, useContext} from 'react';
import FolderList from './FolderLayout/FolderList';
import AddFolder from './FolderLayout/AddFolder';
import AppContext from '../context/AppContext';

const Home = () => {
    const ctx = useContext(AppContext)
    const [update, setUpdate] = useState(false);
    function updateList() {
      setUpdate(!update);
    }
    return (
      <div>
        <FolderList shouldUpdate={update} updateFunc={updateList} token={ctx.user_auth_token}></FolderList>
        <AddFolder updateList={updateList} token={ctx.user_auth_token}></AddFolder>
      </div>
    );
}

export default Home;