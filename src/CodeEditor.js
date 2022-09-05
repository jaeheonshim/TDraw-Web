import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { TDrawContext } from "./App";

export default function CodeEditor() {
    const tContext = useContext(TDrawContext);
    
    function handleEditorChange(value, event) {
        tContext.setTDrawState({...tContext.TDrawState, code: value});
    }

    return (
        <Editor height="90vh" defaultLanguage="java" onChange={handleEditorChange} />
    )
}