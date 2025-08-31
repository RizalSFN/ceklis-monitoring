import { useContext, useMemo, useRef, useState } from "react";
import Note from "./Note";
import { NotesContext } from "./NoteContext";

export default function NoteList() {
    const notes = useContext(NotesContext)
    const [search, setSearch] = useState("")
    const searchInput = useRef(null)

    const filteredNotes = useMemo(() => {
        console.log("filtering notes");
        return notes.filter(note => note.text.includes(search))
    }, [notes, search])

    function handleSearch() {
        console.log("search");
        setSearch(searchInput.current.value)
    }

    return (
        <div>
            <input ref={searchInput} placeholder="search" />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {filteredNotes.map(note => (
                    <li key={note.id}>
                        <Note note={note} />
                    </li>
                ))}
            </ul>
        </div>
    )
}