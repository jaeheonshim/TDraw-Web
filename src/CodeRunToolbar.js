import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function CodeRunToolbar(props) {
    const [showResetModal, setShowResetModal] = useState(false);

    function handleClose() {
        setShowResetModal(false);
    }

    function handleOpen() {
        setShowResetModal(true);
    }

    return (
        <>
            <Modal show={showResetModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Confirm Reset</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to reset your code? (All work will be lost)</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={props.onReset}>
                        Reset
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={props.className}>
                <Row>
                    <Col>
                        <h4 className="float-start mb-0" style={{ lineHeight: 1.5 }}>Main.java</h4>
                    </Col>
                    <Col className="d-flex justify-content-end gap-1">
                        <Button onClick={handleOpen} variant="warning">Reset</Button>
                        <Button style={{ width: "10em" }} variant="success" onClick={props.onRun} disabled={props.isRunning}>{props.isRunning ? "Running..." : "Run!"}</Button>
                    </Col>
                </Row>
            </div>
        </>
    )
}