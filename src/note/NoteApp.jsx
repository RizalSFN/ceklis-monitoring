import { useImmer, useImmerReducer } from "use-immer"
import NoteForm from "./NoteForm"
import NoteList from "./NoteList"
import { useReducer } from "react"

let id = 0
const initialNotes = [
    { id: id++, text: "HTML", done: false },
    { id: id++, text: "CSS", done: true },
    { id: id++, text: "JS", done: false },
    { id: id++, text: "React", done: false },
]

function notesReducer(notes, action) {
    if (action.type === 'ADD_NOTE') {
        notes.push({
            id: id++,
            text: action.text,
            done: false
        })
    } else if (action.type === 'CHANGE_NOTE') {
        const index = notes.findIndex(note => note.id === action.id)
        notes[index].text = action.text
        notes[index].done = action.done
    } else if (action.type === 'DELETE_NOTE') {
        const index = notes.findIndex(note => note.id === action.id)
        notes.splice(index, 1)
    }
}

export default function NoteApp() {
    // const [notes, setNotes] = useImmer(initialNotes)
    const [notes, dispatch] = useImmerReducer(notesReducer, initialNotes)

    function handleAddNote(text) {
        // setNotes((draft) => {
        //     draft.push({
        //         id: id++,
        //         text: text,
        //         done: false
        //     })
        // })

        dispatch({
            type: 'ADD_NOTE',
            text: text
        })
    }

    function handleChangeNote(note) {
        // setNotes((draft) => {
        //     const index = draft.findIndex(item => item.id === note.id)
        //     draft[index] = note
        // })

        dispatch({
            ...note,
            type: 'CHANGE_NOTE'
        })
    }

    function handleDeleteNote(note) {
        // setNotes((draft) => {
        //     const index = draft.findIndex(item => item.id === note.id)
        //     draft.splice(index, 1)
        // })

        dispatch({
            type: 'DELETE_NOTE',
            id: note.id
        })
    }

    return (
        <div>
            <h1>Note App</h1>
            <NoteForm onAddNote={handleAddNote} />
            <NoteList notes={notes} onChange={handleChangeNote} onDelete={handleDeleteNote} />
        </div>
    )
}