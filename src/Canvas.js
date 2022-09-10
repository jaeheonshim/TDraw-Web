import React, { useRef, useState } from "react";
import { useEffect } from "react";

const sinDeg = (a) => {
    return Math.sin(a / 180 * Math.PI);
}

const cosDeg = (a) => {
    return Math.cos(a / 180 * Math.PI);
}

const transform = (x, y, theta) => {
    return [x * cosDeg(theta) + y * cosDeg(theta + 90),
            x * sinDeg(theta) + y * sinDeg(theta + 90)];
}

export default function Canvas(props) {
    const canvasRef = useRef(null);

    const drawJson = props.json;

    const [showTurtle, setShowTurtle] = useState(false);
    
    const drawTurtle = (x, y, heading, context) => {
        const width = 20;
        const height = 25;

        const p1 = transform(-width / 2, -height, heading - 90);
        const p2 = transform(0, -height * 0.7, heading - 90);
        const p3 = transform(width / 2, -height, heading - 90);

        context.moveTo(x, y);
        context.lineTo(x + p1[0], y - p1[1]);
        context.lineTo(x + p2[0], y - p2[1]);
        context.lineTo(x + p3[0], y - p3[1]);
        context.lineTo(x, y);
        context.fill();
    }

    const toCenterPoint = (x, y, context) => {
        return [
            Math.round(x + context.canvas.width / 2),
            Math.round(context.canvas.height / 2 - y)
        ]
    }

    const drawScene = (context) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        if(!drawJson) return;

        context.beginPath();

        for(let i = 1; i <= props.frame; ++i) {
            const prev = drawJson.points[i - 1];
            const curr = drawJson.points[i];
            if(!curr) break;

            context.moveTo(...toCenterPoint(prev.x, prev.y, context));
            context.lineTo(...toCenterPoint(curr.x, curr.y, context));
        }

        context.stroke();

        const lastLocation = drawJson.points[props.frame];
        if(showTurtle) {
            drawTurtle(Math.floor(lastLocation.x), Math.floor(lastLocation.y), lastLocation.heading, context);
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "#000000";
        drawScene(context);
    }, [props.frame]);

    return <canvas style={{border: "1px solid #e0dede", width: "42vw"}} ref={canvasRef} width={drawJson && drawJson.width || 760} height={drawJson && drawJson.height || 510} {...props} />
}