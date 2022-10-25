// import Todo from './components/Todo'
// import Todolist from './components/Todolist'
import styled from "styled-components";
import { CloseOutlined, AddOutlined } from "@mui/icons-material";
import { db } from "./firebase/config";
import React, { useState, useEffect } from "react";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const Container = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  text-align: center;
`;
const ContainerDate = styled.div`
  margin: 2rem 0 1rem 0;
  display: flex;
`;
const DateText = styled.p`
  padding: 0 2px;
`;
const Form = styled.form``;
const Header = styled.h1``;
const FormInput = styled.div``;
const FormIcon = styled.div`
  position: absolute;
  left: 15px;
  top: 0;
  font-size: 25px;
  color: #4b00ff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Input = styled.input`
  position: relative;
  width: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
`;

const App = () => {
  // const [tasks, setTasks] = useState([]);
  // const [input, setInput] = useState("");

  // // add tasks
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

  // // delete tasks
  // const deleteTask = (id) => {
  //   let filteredTasks = [...tasks].filter((tasks) => tasks.id !== id);
  //   setTasks(filteredTasks);
  //   console.log("task deleted");
  // };

  // //completed task
  // const toggleComplete = (id) => {
  //   setTasks(
  //     tasks.map((task) =>
  //       task.id === id ? { ...task, completed: !task.completed } : task
  //     )
  //   );
  // };

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  //Add Task
  const handleSubmit = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "Todo List"), {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    });

    setInput("");
  };
  // Read Todo from firebase
  useEffect(() => {
    const q = query(collection(db, "Todo List"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let tasksArr = [];
      querySnapshot.forEach((doc) => {
        tasksArr.push({ ...doc.data(), id: doc.id });
      });
      setTasks(tasksArr);
    });
    return () => unsubscribe();
  }, []);
  // Delete Task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "Todo List", id));
  };
  // Update Todo in firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "Todo list", todo.id), {
      completed: !todo.completed,
    });
  };

  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Container>
      <Header>Todo List</Header>
      <ContainerDate>
        <DateText>{days[date.getDay()]}</DateText>
        <DateText>{date.getDate()},</DateText>
        <DateText>{months[date.getMonth()]}</DateText>
        <DateText>{date.getFullYear()}</DateText>
      </ContainerDate>

      <Form onSubmit={handleSubmit}>
        <FormInput>
          <FormIcon>
            {/* <AddOutlined onClick={() => addTask(tasks.id)} /> */}
          </FormIcon>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task"
            type="text"
          />
        </FormInput>
      </Form>

      {tasks.map((task) => {
        return (
          <div
            className={`task-row ${task.completed ? "completed" : ""}`}
            key={task.id}
            onDoubleClick={() => toggleComplete(task.id)}
          >
            <p>{task.text} </p>
            <CloseOutlined
              onClick={() => deleteTask(task.id)}
              className="icon"
            />
          </div>
        );
      })}

      <p className="length">
        {tasks < 1 ? "You have no tasks" : `Tasks: ${tasks.length}`}
      </p>
    </Container>
  );
};

export default App;
