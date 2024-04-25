import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addTodo, removeTodo } from "./app/features/todos/todosSlice";
import removeIcon from '../public/delete.png';
import toast from "react-hot-toast";

function App() {
  const { todos } = useSelector((store) => store.todos);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [checkedTodos, setCheckedTodos] = useState({});

 
  useEffect(() => {
    const savedCheckedTodos = JSON.parse(localStorage.getItem("checkedTodos"));
    if (savedCheckedTodos) {
      setCheckedTodos(savedCheckedTodos);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("checkedTodos", JSON.stringify(checkedTodos));
  }, [checkedTodos]);

  const handleCheckboxChange = (id) => {
    setCheckedTodos((prevCheckedTodos) => ({
      ...prevCheckedTodos,
      [id]: !prevCheckedTodos[id]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") {
      return alert("Please write something!")
    }

    dispatch(addTodo({
      id: uuidv4(),
      text
    }));

    setText("");
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id))
    toast.success("this todo successfully deleted")
  };

  return (
    <div className="todo">
      <h1 className="text-5xl mt-8 mb-8 font-bold" >Todo App</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Add Todo"
          className="input input-bordered w-full max-w-[400px]"
        />
        <button type="submit" className="btn btn-primary ml-3">Add</button>
      </form>
      
      <ul className="todos-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              className="checkbox checkbox-success"
              checked={!!checkedTodos[todo.id]}
              onChange={() => handleCheckboxChange(todo.id)}
            />
            <h4 className={checkedTodos[todo.id] ? "completed" : ""}>{todo.text}</h4>
          
            <img
              onClick={() => handleRemoveTodo(todo.id)}
              width="24px"
              src={removeIcon}
              alt="Remove"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
