import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Header from "./components/Header";
import Home from "./components/Home";
import BrowseTodos from "./components/TodoLayout/BrowseTodos";
import EditTodo from "./components/TodoLayout/EditTodo";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:folder_name" element={<BrowseTodos />}></Route>
          <Route path="/:folder_name/:id" element={<EditTodo />}></Route>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
