import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';
import CanvasControls from './CanvasControls';
import DrawingContainer from './DrawingContainer';
import CodeEditor from './CodeEditor';
import { createContext, useState } from 'react';
import CodeRunToolbar from './CodeRunToolbar';
import RunConsole from './RunConsole';
import axios from 'axios';
import { Buffer } from 'buffer';

export const TDrawContext = createContext();

function App() {
  const [TDrawState, setTDrawState] = useState({
    consoleContent: "Welcome to TDraw!"
  });
  
  const [isRunning, setIsRunning] = useState(false);

  function onRun() {
    setIsRunning(true);

    axios.post("/submissions/run", {
      userProgram: Buffer.from(TDrawState.code).toString("base64")
    }).then((response) => {
      setTDrawState({...TDrawState, consoleContent: Buffer.from(response.data.stdout, "base64").toString(), drawJson: response.data.drawJson});
      
    }).finally(() => {
      setIsRunning(false);
    })

    console.log("Running code!");
  }

  return (
    <div className="App">
      <TDrawContext.Provider value={{TDrawState, setTDrawState}}>
        <CodeEditor />
        <CodeRunToolbar isRunning={isRunning} onRun={onRun} />
        <RunConsole content={TDrawState.consoleContent} />
        <DrawingContainer />
      </TDrawContext.Provider>
    </div>
  );
}

export default App;
