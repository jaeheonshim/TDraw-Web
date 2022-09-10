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
import { Col, Container, Navbar, Row, Tab, Tabs } from 'react-bootstrap';
import Editor from '@monaco-editor/react';

export const TDrawContext = createContext();

function App() {
  const [TDrawState, setTDrawState] = useState({
    consoleContent: "Welcome to TDraw!\nhi\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10"
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
    <div className="App h-100">
      <TDrawContext.Provider value={{TDrawState, setTDrawState}}>
        <Container className="h-100 d-flex flex-column" fluid>
          <Navbar className="no-gutters" bg="light" variant="light">
            <Container fluid>
              <Navbar.Brand href="#home">TDraw</Navbar.Brand>
            </Container>
          </Navbar>
          <Row className="no-gutters flex-grow-1" style={{flexBasis: "0"}}>
            <Col className="h-100 d-flex flex-column overflow-auto">
              <CodeRunToolbar className="pt-1 pb-1 mb-2 border-bottom" />
              <div className="flex-grow-1">
                <CodeEditor />
              </div>
            </Col>
            <Col className="border-left d-flex flex-column h-100">
              <Row className="flex-shrink-0">
                <DrawingContainer />
              </Row>
              <Row className="flex-grow-1 overflow-auto">
                <RunConsole />
              </Row>
            </Col>
          </Row>
        </Container>
      </TDrawContext.Provider>
    </div>
  );
}

export default App;
