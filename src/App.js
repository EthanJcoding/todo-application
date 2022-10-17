import "./App.css";
import Todo from "./component/Todo";
import styled from "styled-components";

const Test = styled.div`
  background-color: lightgray;
  width: 100vw;
  height: 100vh;
`;

function App() {
  return (
    <Test className="content">
      <Todo></Todo>
    </Test>
  );
}

export default App;
