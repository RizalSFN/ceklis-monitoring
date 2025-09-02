import { useState } from "react";

export default function TaskForm({ onSubmit }) {
    const [item, setItem] = useState("")

    function handleChange(e) {
        setItem(e.target.value)
    }

    function handleClick(e) {
        e.preventDefault()
        onSubmit(item)
        setItem("")
    }

    return (
        <>
            <h1>Create Task</h1>
            <form>
                <input value={item} onChange={handleChange} />
                <button onClick={handleClick}>add</button>
            </form>
        </>
    )
}