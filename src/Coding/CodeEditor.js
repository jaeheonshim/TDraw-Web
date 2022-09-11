import Editor from "@monaco-editor/react";
import { Buffer } from 'buffer';
import * as monaco from "monaco-editor"
import { useContext, useEffect, useRef } from "react";
import { TDrawContext } from "../App";

const defaultCode = `
import java.awt.*;
import com.jaeheonshim.tdraw.turtle.Turtle;

public class Main {
    public static void main(String[] args) throws IOException {
        Turtle t = new Turtle();

        t.forward(57);
        t.counterClockwise(90);
        t.penDown();
        for (int i = 0; i < 360; ++i) {
            t.forward(1);
            t.counterClockwise(1);
        }
    }
}
`.trim();

export default function CodeEditor(props) {
    const { TDrawState, setTDrawState } = useContext(TDrawContext);
    const editorRef = useRef(null);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    useEffect(() => {
        if(props.example) {
            setTDrawState({ ...TDrawState, code: Buffer.from(props.example, "base64").toString() });
        } else if (localStorage.getItem("code")) {
            setTDrawState({ ...TDrawState, code: Buffer.from(localStorage.getItem("code"), "base64").toString() });
        } else {
            setTDrawState({ ...TDrawState, code: defaultCode });
        }
    }, []);

    function handleEditorChange(value, event) {
        setTDrawState({ ...TDrawState, code: value });
        localStorage.setItem("code", Buffer.from(value).toString("base64"));
    }

    const options = {
        automaticLayout: true,
        readOnly: props.example
    }

    return (
        <Editor options={options} defaultLanguage="java" defaultValue={TDrawState.code} onChange={handleEditorChange} />
    )
}