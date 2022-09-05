export default function RunConsole(props) {
    return (
        <div className="bg-dark text-light p-2 overflow-auto">
            <pre><code>{props.content}</code></pre>
        </div>
    )
}