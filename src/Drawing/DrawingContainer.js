import { useContext, useEffect, useState } from "react"
import { TDrawContext } from "../App";
import { useInterval } from "../hooks/useInterval";
import Canvas from "./Canvas"
import CanvasControls from "./CanvasControls"
import CanvasSlider from "./CanvasSlider";

export default function DrawingContainer() {
    const {TDrawState, setTDrawState} = useContext(TDrawContext);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [lastFrame, setLastFrame] = useState(TDrawState.drawJson ? TDrawState.drawJson.points.length - 1 : 0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setCurrentFrame(TDrawState.drawJson ? TDrawState.drawJson.points.length - 1 : 0);
        setLastFrame(TDrawState.drawJson ? TDrawState.drawJson.points.length - 1 : 0);
    }, [TDrawState.drawJson]);

    const nextFrame = () => {
        if(currentFrame >= lastFrame) return;

        setCurrentFrame(currentFrame + 1);
    }

    const previousFrame = () => {
        if(currentFrame <= 0) return;

        setCurrentFrame(currentFrame - 1);
    }

    const endFrame = () => {
        setCurrentFrame(TDrawState.drawJson.points.length - 1);
    }

    const startFrame = () => {
        setCurrentFrame(0);
    }

    const setFrame = (frame) => {
        if(frame < 0 || frame > lastFrame) return;

        setCurrentFrame(frame);
    }

    const togglePlay = () => {
        if(!isPlaying) {
            setIsPlaying(true);
            if(currentFrame >= lastFrame) setCurrentFrame(0);
        } else {
            setIsPlaying(false);
        }
    }

    useInterval(() => {
        if(isPlaying) {
            nextFrame();
            if(currentFrame >= lastFrame) setIsPlaying(false);
        }
    }, 10);

    return (
        <div>
            <Canvas json={TDrawState.drawJson} frame={currentFrame} />
            <CanvasControls isPlaying={isPlaying} togglePlay={togglePlay} currentFrame={currentFrame} lastFrame={lastFrame} onForward={nextFrame} onBack={previousFrame} onStart={startFrame} onEnd={endFrame} />
            <CanvasSlider onChange={setFrame} lastFrame={lastFrame} currentFrame={currentFrame} />
        </div>
    )
}