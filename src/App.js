import './App.css';
import Canvas from './Drawing/Canvas';
import CanvasControls from './Drawing/CanvasControls';
import DrawingContainer from './Drawing/DrawingContainer';
import CodeEditor from './Coding/CodeEditor';
import { createContext, useState } from 'react';
import CodeRunToolbar from './Coding/CodeRunToolbar';
import RunConsole from './Coding/RunConsole';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Col, Container, Navbar, Row, Tab, Tabs } from 'react-bootstrap';
import Editor from '@monaco-editor/react';

export const TDrawContext = createContext();

function App() {
  const [TDrawState, setTDrawState] = useState({
    consoleContent: "Welcome to TDraw!\n\nTDraw is an open source turtle graphics web platform for the Java programming language."
  });
  
  const [isRunning, setIsRunning] = useState(false);

  function onRun() {
    setIsRunning(true);
    setTDrawState({...TDrawState, consoleContent: "Sending your code to the server..."});

    axios.post("/submissions/run", {
      userProgram: Buffer.from(TDrawState.code).toString("base64")
    }).then((response) => {
      setTDrawState({...TDrawState, consoleContent: Buffer.from(response.data.stdout, "base64").toString() + "\n\n" + new Date() + "\nRun successfully completed.", drawJson: response.data.drawJson});
    }).finally(() => {
      setIsRunning(false);
    })

    console.log("Running code!");
  }

  function onReset() {
    localStorage.removeItem("code");
    window.location.reload();
  }

  return (
    <div className="App h-100">
      <TDrawContext.Provider value={{TDrawState, setTDrawState}}>
        <Container fluid>
          <Navbar bg="light" variant="light">
            <Container fluid>
              <Navbar.Brand href="#home">TDraw</Navbar.Brand>
            </Container>
          </Navbar>
          <Row className="content">
            <Col className="h-100 d-flex flex-column flex-grow-1 overflow-auto">
              <CodeRunToolbar isRunning={isRunning} onReset={onReset} onRun={onRun} className="pt-1 pb-1 mb-2 border-bottom" />
              <div className="flex-grow-1">
                <CodeEditor />
              </div>
            </Col>
            <Col className="border-left d-flex flex-column h-100">
              <Row className="flex-shrink-0">
                <DrawingContainer />
              </Row>
              <Row className="flex-grow-1 overflow-auto">
                <RunConsole content={TDrawState.consoleContent} />
              </Row>
            </Col>
          </Row>
        </Container>
      </TDrawContext.Provider>
    </div>
  );
}

export default App;
