import { useState } from "react"
import Canvas from "./Canvas"
import CanvasControls from "./CanvasControls"
import CanvasSlider from "./CanvasSlider";
import drawJson from "./drawInfo.json"

export default function DrawingContainer() {
    const [currentFrame, setCurrentFrame] = useState(250);
    const [lastFrame, setLastFrame] = useState(drawJson.points.length - 1);

    const nextFrame = () => {
        if(currentFrame >= lastFrame) return;

        setCurrentFrame(currentFrame + 1);
    }

    const previousFrame = () => {
        if(currentFrame <= 0) return;

        setCurrentFrame(currentFrame - 1);
    }

    const endFrame = () => {
        setCurrentFrame(drawJson.points.length - 1);
    }

    const startFrame = () => {
        setCurrentFrame(0);
    }

    const setFrame = (frame) => {
        if(frame < 0 || frame > lastFrame) return;

        setCurrentFrame(frame);
    }

    return (
        <div>
            <Canvas json={drawJson} frame={currentFrame} />
            <CanvasControls currentFrame={currentFrame} lastFrame={lastFrame} onForward={nextFrame} onBack={previousFrame} onStart={startFrame} onEnd={endFrame} />
            <CanvasSlider onChange={setFrame} lastFrame={lastFrame} currentFrame={currentFrame} />
            frame: {currentFrame}
        </div>
    )
}