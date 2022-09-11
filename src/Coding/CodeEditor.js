import Editor from "@monaco-editor/react";
import { Buffer } from 'buffer';
import * as monaco from "monaco-editor"
import { useContext, useEffect, useRef } from "react";
import { TDrawContext } from "../App";

const defaultCode = "aW1wb3J0IGphdmEuYXd0Lio7CmltcG9ydCBjb20uamFlaGVvbnNoaW0udGRyYXcudHVydGxlLlR1cnRsZTsKCi8qKgoqIFdlbGNvbWUgdG8gVERyYXchIFlvdSBjYW4gd3JpdGUgeW91ciBjb2RlIGhlcmUgaW4gdGhlIGVkaXRvci4KKgoqIE9uY2UgeW91J3JlIHJlYWR5IHRvIHRyeSB5b3VyIGNvZGUgb3V0LCBjbGljayB0aGUgZ3JlZW4gIlJ1biEiIGJ1dHRvbi4KKiBJZiB5b3UgZXZlciB3YW50IHRvIHJldHVybiB0byB0aGUgZGVmYXVsdCBjb2RlLCBjbGljayAiUmVzZXQiLgoqCiogUmVtZW1iZXIsIHRoZSBURHJhdyBjYW52YXMgaXMgYSA3NjB4NTEwIGNvb3JkaW5hdGUgZ3JpZCwgd2l0aCAoMCwgMCkgYXQgdGhlIGNlbnRlci4KKi8KcHVibGljIGNsYXNzIE1haW4gewogICAgcHVibGljIHN0YXRpYyB2b2lkIG1haW4oU3RyaW5nW10gYXJncykgdGhyb3dzIElPRXhjZXB0aW9uIHsKICAgICAgICBUdXJ0bGUgdCA9IG5ldyBUdXJ0bGUoKTsKCiAgICAgICAgdC5mb3J3YXJkKDU3KTsKICAgICAgICB0LmNvdW50ZXJDbG9ja3dpc2UoOTApOwogICAgICAgIHQucGVuRG93bigpOwoKICAgICAgICAvLyBkcmF3cyBhIGNpcmNsZQogICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgMzYwOyArK2kpIHsKICAgICAgICAgICAgdC5mb3J3YXJkKDEpOwogICAgICAgICAgICB0LmNvdW50ZXJDbG9ja3dpc2UoMSk7CiAgICAgICAgfQogICAgfQp9".trim();

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
            setTDrawState({ ...TDrawState, code: Buffer.from(defaultCode, "base64").toString() });
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