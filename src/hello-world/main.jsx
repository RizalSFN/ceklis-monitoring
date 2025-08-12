import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";
import TodoList from "../todolist/TodoList";
import Table from "../table/Table";
import AlertButton from "../button/AlertButton";
import MyButton from "../button/MyButton";
import Toolbar from "../button/Toolbar";
import SearchForm from "../form/SearchForm";
import SayHelloForm from "../form/SayHelloForm";
import Counter from "../form/Counter";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Container>
            <HelloWorld />
            <TodoList />
            <Table />

            <AlertButton text="click cuy" message="Di klik cuyy" />

            <MyButton text="Button 1" onSmash={() => alert("You click me")} />

            <Toolbar onClick={(e) => {
                e.stopPropagation()
                alert("Toolbar clicked")
            }} />

            <SearchForm />

            <SayHelloForm />

            <Counter />
            <Counter />
        </Container>
    </StrictMode>
)