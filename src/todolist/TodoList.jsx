import Todo from "./Todo";

export default function TodoList() {
    const data = [
        {
            id: 0,
            text: "Learn HTML",
            isCompleted: true
        },
        {
            id: 1,
            text: "Learn JS",
            isCompleted: true
        },
        {
            id: 2,
            text: "Learn PHP",
            isCompleted: true
        },
        {
            id: 3,
            text: "Learn Java",
            isCompleted: false
        },
    ]

    return (
        <ul>
            {data.map((todo) => (
                <Todo key={todo.id} {...todo} />
            ))}
        </ul>
    )
}