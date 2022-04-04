import React, { useState } from "react";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

const Home = () => {
  const [update, setUpdate] = useState(false);
  function updateList() {
    setUpdate(!update);
  }
  return (
    <div>
      <TodoList shouldUpdate={update} updateFunc={updateList}></TodoList>
      <AddTodo updateList={updateList}></AddTodo>
    </div>
  );
};

export default Home;
