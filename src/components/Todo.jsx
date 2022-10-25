import styled from 'styled-components'
import React, { useState } from "react";
import { AddOutlined } from "@mui/icons-material";

const Container = styled.div``;
const ContainerDate= styled.div`
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

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // add tasks
  const handleSubmit = (e) => {
    e.preventDefault();
    const addTask = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      completed: false,
    };
    setTasks([...tasks, addTask]);
    setInput("");
  };

  const date = new Date();
// console.log(date)
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
            <AddOutlined />
          </FormIcon>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a task"
            type="text"
          />
        </FormInput>
      </Form>
    </Container>
  );
};

export default Todo;
