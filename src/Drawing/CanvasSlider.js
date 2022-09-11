export default function CanvasSlider(props) {
    const onChange = (e) => {
        props.onChange(parseInt(e.target.value));
    }

    return (
        <input type="range" className="form-range" min="0" onChange={onChange} max={props.lastFrame} step={1} value={props.currentFrame} />
    )
}