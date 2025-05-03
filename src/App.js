import WallBlock from "./components/WallBlock";
import { useRef, useEffect } from "react";
import "./App.css";
import mom1 from "./assets/mom1.jpg";
import mom2 from "./assets/mom2.PNG";
import mom3 from "./assets/mom3.jpg";
import mom4 from "./assets/mom4.jpg";
import mom5 from "./assets/mom5.jpg";
import mom6 from "./assets/mom6.jpg";
import mom7 from "./assets/mom7.jpg";
import song from "./assets/song.mp3";

function App() {
    const audioRef = useRef(null);

    useEffect(() => {
        const playAudio = () => {
            audioRef.current?.play().catch((e) => {
                audioRef.current.currentTime = 0.15;
                console.log("Autoplay blocked", e);
            });
        };

        // Trigger on first user interaction
        window.addEventListener("scroll", playAudio, { once: true });
        window.addEventListener("click", playAudio, { once: true });

        return () => {
            window.removeEventListener("click", playAudio);
            window.removeEventListener("scroll", playAudio);
        };
    }, []);

    const data = [
        {
            image: mom1,
            title: "Queen of Our Hearts",
            message: "You taught me strength, grace, and kindness. I love you so much.",
            align: "left",
        },
        {
            image: mom2,
            title: "Queen of Our Hearts",
            message: "Every smile of yours is my greatest blessing. Thank you, Mom.",
            align: "right",
        },
        {
            image: mom3,
            title: "Queen of Our Hearts",
            message: "From childhood to now, you’ve always been my hero.",
            align: "left",
        },
        {
            image: mom4,
            title: "Queen of Our Hearts",
            message: "From childhood to now, you’ve always been my hero.",
            align: "right",
        },
        {
            image: mom5,
            title: "Queen of Our Hearts",
            message: "From childhood to now, you’ve always been my hero.",
            align: "left",
        },
        {
            image: mom6,
            title: "Queen of Our Hearts",
            message: "From childhood to now, you’ve always been my hero.",
            align: "right",
        },
    ];

    return (
        <div className="bg-gradient-to-b from-white via-pink-50 to-yellow-50 min-h-screen">
            <h1 className="text-4xl font-bold text-center pt-10">Happy Mother's Day!</h1>

            <audio
                ref={audioRef}
                src={song}
                autoPlay
                loop
                controls
                className="hidden"
            />

            <div className="relative mx-auto max-w-md sm:max-w-3xl lg:max-w-4xl px-4 sm:px-6 md:px-8 py-8">
                {/* Map through data */}
                {data.map((item, index) => (
                    <div key={index}>
                        <WallBlock
                            image={item.image}
                            title={item.title}
                            message={item.message}
                            align={item.align}
                        />

                        {/* Dot in between each wall block */}
                        {index < data.length - 1 && (
                            <div className="relative z-10 flex justify-center my-4">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-400 border-2 sm:border-4 border-white rounded-full shadow-md animate-pulse"></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
