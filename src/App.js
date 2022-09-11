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
import { Col, Container, Nav, Navbar, NavDropdown, Row, Tab, Tabs } from 'react-bootstrap';
import Editor from '@monaco-editor/react';
import examples from "./examples.json"

export const TDrawContext = createContext();

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const example_id = queryParams.get("example") && queryParams.get("example").trim().toLowerCase();

  const [TDrawState, setTDrawState] = useState({
    consoleContent: "Welcome to TDraw!\n\nTDraw is an open source turtle graphics web platform for the Java programming language.\nClick on \"Documentation\" in the header to read the TDraw documentation, or check out some examples to help you get started."
  });
  
  const [isRunning, setIsRunning] = useState(false);

  function onRun() {
    setIsRunning(true);
    setTDrawState({...TDrawState, consoleContent: "Sending your code to the server..."});

    axios.post("/submissions/run", {
      userProgram: Buffer.from(TDrawState.code).toString("base64")
    }).then((response) => {
      const additionalMessage = response.data.drawJson ? `${response.data.drawJson.points.length} movement points` : "";
      setTDrawState({...TDrawState, consoleContent: Buffer.from(response.data.stdout, "base64").toString() + "\n\n" + new Date() + `\nRun successfully completed. UUID: ${response.data.uuid}\n` + additionalMessage, drawJson: response.data.drawJson});
    }).catch((error) => {
      setTDrawState({...TDrawState, consoleContent: "Run failed. (Server error)"});
    }).finally(() => {
      setIsRunning(false);
    })

    console.log("Running code!");
  }

  function onReset() {
    localStorage.removeItem("code");
    window.location.reload();
  }

  function onRemix() {
    localStorage.setItem("code", examples[example_id]);
    window.location = window.location.href.split("?")[0];
  }

  return (
    <div className="App h-100">
      <TDrawContext.Provider value={{TDrawState, setTDrawState}}>
        <Container fluid>
          <Navbar bg="light" variant="light">
              <Navbar.Brand href="/">TDraw</Navbar.Brand>
              <Nav className="me-auto">
                <NavDropdown title="Examples">
                  <NavDropdown.Item href="?example=spiral">Spiral</NavDropdown.Item>
                  <NavDropdown.Item href="?example=square_spiral">Square Spiral</NavDropdown.Item>
                  <NavDropdown.Item href="?example=hexagonal_spiral">Hexagonal Spiral</NavDropdown.Item>
                  <NavDropdown.Item href="?example=projectile_motion">Projectile Motion</NavDropdown.Item>
                  <NavDropdown.Item href="?example=sierpinski">Sierpinski Triangle</NavDropdown.Item>
                  <NavDropdown.Item href="?example=random">Random</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link target="_blank" href="https://jaeheonshim.dev/TDraw-Engine/DOCUMENTATION.html">Documentation</Nav.Link>
            </Nav>
          </Navbar>
          <Row className="content">
            <Col className="h-100 d-flex flex-column flex-grow-1 overflow-auto">
              <CodeRunToolbar example={examples[example_id]} isRunning={isRunning} onRemix={onRemix} onReset={onReset} onRun={onRun} className="pt-1 pb-1 mb-2 border-bottom" />
              <div className="flex-grow-1">
                <CodeEditor example={examples[example_id]} />
              </div>
            </Col>
            <Col className="border-left d-flex flex-column h-100">
              <Row className="flex-shrink-0 text-center">
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
