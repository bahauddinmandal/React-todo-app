import React, { useState } from 'react';

function Todo() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleTodoSubmit = (event) => {
    event.preventDefault();
    if (todo.trim() !== '') {
      setTodos([...todos, {todo, complete:false}]);
      setTodo('');
    }
  };

  const handleTodoDelete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  
  const toggleComplete = (i) =>{
    const todosClone = [...todos];
    todosClone[i].complete = !todosClone[i].complete;
    setTodos(todosClone);
  }
  
  const clrTodos = ()=>{
    const completedTodos = [...todos].filter((item) => item.complete === false);
    
     setTodos(completedTodos);
  }
  return (
    <div className="max-w-lg shadow-2xl h-dvh mx-auto" >
      <h1 className="text-3xl font-bold text-center m-1" ><span className="text-red-500" >Todo</span> List</h1>
      <form className="w-full flex p-5" onSubmit={handleTodoSubmit}>
        <input
          className="flex-1 mr-1 h-10 p-2 rounded border-2 focus:outline-0 focus:border-2 focus:border-red-500 focus:ring-2 ring-red-300 ring-offset-2 border-red-500"
          type="text"
          value={todo}
          onChange={handleInputChange}
          placeholder="Enter a todo"
        />
        <button className="bg-white h-10 ml-1 p-2 rounded font-bold text-red-500 border-2 border-red-500 focus:ring-2 ring-red-300 ring-offset-1" type="submit" value="submit">Add Todo</button>
      </form>
      <ul >
        {todos.map((todo, index) => (
          <li className="flex items-center justify-between mx-5 my-2 border rounded"  key={index}>
             <input className="appearance-none size-5 border-2 border-red-500 rounded-full ml-2 checked:bg-red-500 checked:ring-2 ring-red-500 ring-offset-2 checked:size-3" type="checkBox" checked={todo.complete}/>
            <span onClick={()=>toggleComplete(index)} className={todo.complete?"text-red-500 flex-1 p-2":"text-black flex-1 p-2"}>
               {todo.todo} </span>
            <button className="bg-red-600 p-1 rounded text-white mr-1 w-10" onClick={() => handleTodoDelete(index)}>&#10008;</button>
          </li>
        ))}
      </ul>
      <div className="w-full text-center" >
      {todos.some(item => item.complete===true)&& <button className="m-5 p-2 rounded-2xl bg-red-600 text-white hover:ring-2 ring-red-300 ring-offset-2" onClick={clrTodos}>
         &#128465; Delete completed Todos!
        </button>} 
      </div>
    </div>
  );
}

export default Todo;
