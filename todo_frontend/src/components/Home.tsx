import React, {useState} from 'react';
import FolderList from './FolderLayout/FolderList';
import AddFolder from './FolderLayout/AddFolder';

const Home = () => {
    const [update, setUpdate] = useState(false);
    function updateList() {
      setUpdate(!update);
    }
    return (
      <div>
        <FolderList shouldUpdate={update} updateFunc={updateList}></FolderList>
        <AddFolder updateList={updateList}></AddFolder>
      </div>
    );
}

export default Home;