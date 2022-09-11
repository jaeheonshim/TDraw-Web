import { Button, Col, Row } from "react-bootstrap";

export default function CodeRunToolbar(props) {
    return (
        <div className={props.className}>
            <Row>
                <Col>
                    <h4 className="float-start mb-0" style={{lineHeight: 1.5}}>Main.java</h4>
                </Col>
                <Col>
                    <Button className="float-end px-5" variant="success" onClick={props.onRun} disabled={props.isRunning}>{props.isRunning ? "Running..." : "Run!"}</Button>
                </Col>
            </Row>
            </div>
    )
}