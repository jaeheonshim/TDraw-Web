import { Button, ButtonGroup } from "react-bootstrap";

export default function CanvasControls(props) {
    return (
        <div>
            <ButtonGroup>
                <Button onClick={props.onStart} disabled={props.currentFrame <= 0}>START</Button>
                <Button onClick={props.onBack} disabled={props.currentFrame <= 0}>BACK</Button>
                <Button onClick={props.togglePlay}>{props.isPlaying ? "STOP" : "PLAY"}</Button>
                <Button onClick={props.onForward} disabled={props.currentFrame >= props.lastFrame}>FORWARD</Button>
                <Button onClick={props.onEnd} disabled={props.currentFrame >= props.lastFrame}>END</Button>
            </ButtonGroup>
        </div>
    )
}