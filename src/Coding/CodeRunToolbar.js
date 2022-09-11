import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function CodeRunToolbar(props) {
    const [showResetModal, setShowResetModal] = useState(false);
    const [showRemixModal, setShowRemixModal] = useState(false);

    function handleCloseReset() {
        setShowResetModal(false);
    }

    function handleOpenReset() {
        setShowResetModal(true);
    }

    function handleCloseRemix() {
        setShowRemixModal(false);
    }

    function handleOpenRemix() {
        setShowRemixModal(true);
    }

    return (
        <>
            <Modal show={showResetModal} onHide={handleCloseReset}>
                <Modal.Header>
                    <Modal.Title>Confirm Reset</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to reset your code? (All work will be lost)</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReset}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={props.onReset}>
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRemixModal} onHide={handleCloseRemix}>
                <Modal.Header>
                    <Modal.Title>Confirm Remix</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to remix this example? Your current code will be replaced. <b>(All of your current personal code will be lost)</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemix}>
                        Cancel
                    </Button>
                    <Button variant="warning" onClick={props.onRemix}>
                        Remix
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={props.className}>
                <Row>
                    <Col>
                        {
                            props.example ? 
                            <>
                            <div>
                                <h4 className="float-start mb-0" style={{ lineHeight: 1.5 }}>Example</h4>
                                <a className="btn btn-outline-secondary" style={{marginLeft: "1em"}} href="/">Return to editor</a>
                                <Button onClick={handleOpenRemix} variant="outline-primary" style={{marginLeft: "0.5em"}}>Remix!</Button>
                            </div>
                            </> :
                            <h4 className="float-start mb-0" style={{ lineHeight: 1.5 }}>Main.java</h4>
                        }
                    </Col>
                    <Col className="d-flex justify-content-end gap-1">
                        {!props.example && <Button onClick={handleOpenReset} variant="warning">Reset</Button>}
                        <Button style={{ width: "10em" }} variant="success" onClick={props.onRun} disabled={props.isRunning}>{props.isRunning ? "Running..." : "Run!"}</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}