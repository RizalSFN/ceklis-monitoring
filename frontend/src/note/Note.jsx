import { useContext, useState } from "react";
import { NotesDispatchContext } from "./NoteContext";

export default function Note({ note }) {
    const dispatch = useContext(NotesDispatchContext)
    const [isEditiing, setIsEditing] = useState(false)

    function handleChangeText(e) {
        dispatch({
            ...note,
            type: "CHANGE_NOTE",
            text: e.target.value
        })
    }

    function handleChangeDone(e) {
        dispatch({
            ...note,
            type: "CHANGE_NOTE",
            done: e.target.checked
        })
    }

    function handleDelete() {
        dispatch({
            type: "DELETE_NOTE",
            id: note.id
        })
    }

    let component

    if (isEditiing) {
        component = (
            <>
                <input value={note.text} onChange={handleChangeText} />
                <button onClick={() => setIsEditing(false)} >Save</button>
            </>
        )
    } else {
        component = (
            <>
                {note.text}
                <button onClick={() => setIsEditing(true)} >Edit</button>
            </>
        )
    }

    return (
        <label>
            <input type="checkbox" checked={note.done} onChange={handleChangeDone} />
            {component}
            <button onClick={handleDelete}>Delete</button>
        </label>
    )
}