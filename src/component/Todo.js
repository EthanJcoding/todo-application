import styled from "styled-components";
import { useState } from "react";

const TodoMain = styled.div`
  background-color: lightblue;
  border-radius: 15px;
  height: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  input {
    border: transparent;
    border-bottom: 1px solid gray;
    background-color: lightblue;
    outline: none;
  }

  button {
    border-radius: 20px;
    border: transparent;
  }

  button:hover {
    background-color: lightgray;
  }


`;

const Todo = () => {
  const [newData, setNewData] = useState([]);

  const getUserInput = (e) => {
    e.preventDefault();
    let userInput = e.target[0].value;
    setNewData([...newData, userInput]);
    e.target[0].value = "";
  };

  const onClick = (e) => {
    console.log(e.target.value)
    let newArr = newData.filter(el => el !== e.target.value)
    setNewData(newArr)
  }



  return (
    <TodoMain className="todo-wrapper">
      <div className="logo">Todo</div>
      <form onSubmit={getUserInput}>
        <input></input>
        <button>submit</button>
      </form>
      <ul>{newData.map((el, idx) => <li key={idx}>{el}<button onClick={onClick} value={el}>X</button></li>)}</ul>
    </TodoMain>
  );
};

export default Todo;

// 이곳에서 데이터를 받아서 로컬스토리지를 쓸건지 정해야함

// useState를 이용해서 userinput을 데이터화 했음.
// map을 이용하여 해당 데이터를 html요소로 뿌려야함 
// 