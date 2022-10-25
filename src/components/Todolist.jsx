import React, { useState } from "react";
import { CloseOutlined } from "@mui/icons-material";
import styled from "styled-components"


const Container = styled.div``;

const Todolist = () => {
  const [tasks, setTasks] = useState([]);
  //const [input, setInput] = useState("");

  // add tasks
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const addTask = {
  //     id: Math.floor(Math.random() * 1000),
  //     text: input,
  //     completed: false,
  //   };
  //   setTasks([...tasks, addTask]);
  //   setInput("");
  // };

  // delete tasks
  const deleteTask = (id) => {
    let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id);
    setTasks(filteredTasks);
    console.log("task deleted");
  };

  // toggle completed task
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Container>
      {tasks.map((task) => {
        return (
          <div
          className={`task-row ${task.completed ? "completed" : ""}`}
          key={task.id}
          onDoubleClick={() => toggleComplete(task.id)}
        >
          <p>{task.text} </p>
          <CloseOutlined onClick={() => deleteTask(task.id)} className="icon" />
        </div>
        )
      })}

      <p className="length">
        {tasks < 1 ? "You have no tasks" : `Tasks: ${tasks.length}`}
      </p>
    </Container>
  );
};

export default Todolist;
