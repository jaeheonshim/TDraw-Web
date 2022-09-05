import { Button } from "react-bootstrap";

export default function CodeRunToolbar(props) {
    return (
        <div>
            <Button variant="success" onClick={props.onRun} disabled={props.isRunning}>{props.isRunning ? "Running..." : "Run!"}</Button>
        </div>
    )
}