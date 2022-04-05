import React from "react";
import { useCookies } from 'react-cookie';
import { ContextProvider } from './context/AppContext'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Header from "./components/Header";
import Home from "./components/Home";
import BrowseTodos from "./components/TodoLayout/BrowseTodos";
import EditTodo from "./components/TodoLayout/EditTodo";
import Login from "./components/Login";

function App() {
  const [cookies] = useCookies(['userToken']);
  if(!cookies.userToken){
    return <Login></Login>
  }
  return (
    <ContextProvider value={{"user_auth_token": cookies.userToken}}>
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/ensolvers-challenge/" element={<Home />}></Route>
          <Route path="/ensolvers-challenge/:folder_name" element={<BrowseTodos />}></Route>
          <Route path="/ensolvers-challenge/:folder_name/:id" element={<EditTodo />}></Route>
        </Routes>
      </Router>
    </LocalizationProvider>
    </ContextProvider>
  );
}

export default App;
