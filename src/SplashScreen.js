import ReactTypingEffect from "react-typing-effect";

export default function SplashScreen() {
    return (
        <div className="mx-auto h-100 w-100 text-center d-flex flex-column justify-content-center">
            <div className="flex-grow-1 d-flex flex-column justify-content-center">
                <h1 class="display-1 mt-0">
                    <ReactTypingEffect
                        text={["TDraw"]}
                        typingDelay={20}
                        speed={25}
                    />
                </h1>
            </div>
        </div>
    )
}