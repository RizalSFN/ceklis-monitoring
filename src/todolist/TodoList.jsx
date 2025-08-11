import Todo from "./Todo";

export default function TodoList() {
    return (
        <ul>
            <Todo isCompleted={true} text="Learn JS" isDeleted={true}/>
            <Todo isCompleted={true} text="Learn JSX"/>
            <Todo isCompleted={true} text="Learn TS"/>
            <Todo isCompleted={false} text="Learn CSS"/>
        </ul>
    )
}