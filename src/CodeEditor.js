import Editor from "@monaco-editor/react";
import { useContext } from "react";
import { TDrawContext } from "./App";

export default function CodeEditor() {
    const {TDrawState, setTDrawState} = useContext(TDrawContext);
    
    function handleEditorChange(value, event) {
        //setTDrawState({...TDrawState, code: value});
    }

    return (
        <Editor defaultLanguage="java" fixedOverflowWidgets={true} automaticLayout={true} onChange={handleEditorChange} />
    )
}