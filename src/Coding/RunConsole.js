export default function RunConsole(props) {
    return (
        <div className="bg-dark text-light p-2 h-100 overflow-hidden">
            <pre className="text-break h-100"><code>{props.content}</code></pre>
        </div>
    )
}