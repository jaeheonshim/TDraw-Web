export default function RunConsole(props) {
    return (
        <div className="bg-dark text-light p-2 overflow-hidden">
            <pre className="overflow-hidden"><code className="overflow-hidden">{props.content}</code></pre>
        </div>
    )
}