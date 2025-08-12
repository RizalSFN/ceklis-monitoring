export default function SearchForm() {
    return (
        <form>
            <input type="text" />
            <button onClick={(e) => {
                e.preventDefault()
                alert("Button Search Clicked")
            }}>Search</button>
        </form>
    )
}