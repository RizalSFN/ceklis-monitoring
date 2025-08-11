import "./HelloWorld.css";

export default function HelloWorld() {
    const props = {
        text: "Hello World spread syntax"
    }
    return (
        <div>
            <HeaderHelloWorld {...props}/>
            <ParagrafHelloWorld/>
        </div>
    )
}

export function HeaderHelloWorld({text = "ups, ini kelupaan teks"}) {
    // const text = "Hello world";
    return (
        <h1 className="title">{text.toUpperCase()}</h1>
    )
}

export function ParagrafHelloWorld() {
    const text = "ini paragraf"
    return (
        <p className="content">{text.toLowerCase()}</p>
    )
}

