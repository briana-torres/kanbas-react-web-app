import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";

export default function TodoList() {
    const { todos } = useSelector((state: any) => state.todosReducer);
    return (
        <div className="w-25">
            <h2>Todo List</h2>
            <div className="card rounded-3 border shadow-sm">
                <ul className="list-group list-group-flush">
                    <TodoForm />
                    {todos.map((todo: any) => (
                        <TodoItem todo={todo} />
                    ))}
                </ul>
            </div>
        </div>
    );
}
