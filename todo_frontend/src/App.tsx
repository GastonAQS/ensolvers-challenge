import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Header from "./components/Header";
import Home from "./components/Home";
import EditTodo from "./components/EditTodo";

function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<EditTodo />}></Route>
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
