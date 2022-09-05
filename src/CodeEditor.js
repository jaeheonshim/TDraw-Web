import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { TDrawContext } from "./App";

export default function CodeEditor() {
    const {TDrawState, setTDrawState} = useContext(TDrawContext);
    
    function handleEditorChange(value, event) {
        setTDrawState({...TDrawState, code: value});
    }

    return (
        <Editor height="90vh" defaultLanguage="java" onChange={handleEditorChange} />
    )
}