import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item">
            <div className="d-flex">
                <input 
                    className="form-control me-2 flex-grow-1"
                    value={todo.title}
                    onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} 
                />
                <button 
                    onClick={() => dispatch(updateTodo(todo))}
                    className="btn btn-warning me-2"
                    id="wd-update-todo-click">
                    Update
                </button>
                <button 
                    onClick={() => dispatch(addTodo(todo))}
                    className="btn btn-success"
                    id="wd-add-todo-click">
                    Add
                </button>
            </div>
        </li>
    );
}
