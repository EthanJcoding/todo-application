import styled from "styled-components";
import { useEffect, useState } from "react";



const TodoMain = styled.div`
  background-color: lightblue;
  border-radius: 15px;
  height: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 72px;

  input {
    border: transparent;
    border-bottom: 1px solid gray;
    background-color: lightblue;
    outline: none;
    font-size: 72px;
  }



  button {
    border: transparent;
    font-size: 72px;
    background-color: transparent;
  }

  button:hover {
    background-color: transparent;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.9);
  }

  ul {
    list-style-type: none;
  }

  ul > li {
    display: flex;
    margin-top: 8px;
    justify-content: space-between;
  }

  li:hover {
    box-shadow: 1px 3px 5px rgba(0,0,0,0.9);
  }
`;



const Todo = () => {
  const [todo, setTodo] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:3001/todo`)
        .then((res) => {
          if (!res.ok) {
            throw Error("could not fetch the data for that resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsPending(false);
          setTodo(data);
          setError(null);
        })
        .catch((err) => {
          setIsPending(false);
          setError(err.message);
        });
    }, 10);
  }, []);



  const getUserInput = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/todo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "todo": e.target[0].value
      })
    })
    window.location.reload();
  };




  const onClick = (e) => {
    console.log(e.target.value)
    fetch(`http://localhost:3001/todo/${e.target.value}`, {
      method: "DELETE"
    })
    window.location.reload();
  }


  const onEditClick = (e) => {
    e.preventDefault()
    console.log(e.target[0].id)
    console.log(e.target[0])
    fetch(`http://localhost:3001/todo/${e.target[0].id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        "todo": e.target[0].value
      })
    })
    window.location.reload();
  }

  const onEdit = (e) => {
    setEditMode(!editMode)
  }



  return (
    <TodoMain className="todo-wrapper">
      <div className="logo">오늘 할 일</div>
      <form onSubmit={getUserInput}>
        <input type="text" placeholder="오늘 뭐 할까?"></input>
        <button className="todo-submit">💡</button>
      </form>
      <ul>{todo && todo.map((el) =>
        <li key={el.id}>
          {editMode === false ? <div>{el.todo}</div> :
            <form onSubmit={onEditClick}>
              <input placeholder={el.todo} id={el.id}></input>
            </form>}
          <div>
            <button value={el.id} onClick={onClick}>🗑</button>
            <button value={el.todo} onClick={onEdit}>✍️</button>
          </div>
        </li>)}
      </ul>
    </TodoMain>
  );
};

export default Todo;

// 이곳에서 데이터를 받아서 로컬스토리지를 쓸건지 정해야함

// useState를 이용해서 userinput을 데이터화 했음.
// map을 이용하여 해당 데이터를 html요소로 뿌려야함 
// 