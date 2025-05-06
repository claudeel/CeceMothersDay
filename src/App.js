import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, Upload, Volume2, VolumeX } from 'lucide-react';
import mom1 from "./assets/mom1.jpg";
import mom2 from "./assets/mom2.PNG";
import mom3 from "./assets/mom3.jpg";
import mom4 from "./assets/mom4.jpg";
import mom5 from "./assets/mom5.jpg";
import mom6 from "./assets/mom6.jpg";
import song from "./assets/song.mp3"

export default function MomTimeline() {
    const [isMuted, setIsMuted] = useState(false);
    const [events, setEvents] = useState([
        {
            id: 1,
            year: '1985',
            title: 'College Graduation',
            description: 'Graduated with honors in Education',
            emoji: '🎓',
            color: 'bg-pink-100',
            image: mom1
        },
        {
            id: 2,
            year: '1988',
            title: 'Wedding Day',
            description: 'Married Dad in a beautiful summer ceremony',
            emoji: '💍',
            color: 'bg-purple-100',
            image: mom2
        },
        {
            id: 3,
            year: '1990',
            title: 'Became a Mom',
            description: 'Welcomed me into the world',
            emoji: '👶',
            color: 'bg-blue-100',
            image: mom3
        },
        {
            id: 4,
            year: '1995',
            title: 'Started Teaching',
            description: 'Began her career as an elementary school teacher',
            emoji: '👩‍🏫',
            color: 'bg-yellow-100',
            image: mom4
        },
        {
            id: 5,
            year: '2007',
            title: 'Teacher of the Year',
            description: 'Recognized for excellence in education',
            emoji: '🏆',
            color: 'bg-green-100',
            image: mom4
        },
        {
            id: 6,
            year: '2015',
            title: 'World Traveler',
            description: 'Fulfilled her dream of visiting Europe',
            emoji: '✈️',
            color: 'bg-indigo-100',
            image: mom5
        },
        {
            id: 7,
            year: '2022',
            title: 'Grandma',
            description: 'Welcomed her first grandchild',
            emoji: '👵',
            color: 'bg-red-100',
            image: mom6
        }
    ]);

    const [currentEvent, setCurrentEvent] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const [newEvent, setNewEvent] = useState({
        year: '',
        title: '',
        description: '',
        emoji: '❤️',
        color: 'bg-pink-100',
        image: '/api/placeholder/400/320'
    });

    const colorOptions = [
        'bg-pink-100',
        'bg-purple-100',
        'bg-blue-100',
        'bg-green-100',
        'bg-yellow-100',
        'bg-red-100',
        'bg-indigo-100'
    ];

    const emojiOptions = ['❤️', '🎓', '💍', '👶', '👩‍🏫', '🏆', '✈️', '👵', '🎂', '🏠', '🌟', '🎉'];

    const handlePrevious = () => {
        setCurrentEvent(prev => (prev > 0 ? prev - 1 : events.length - 1));
    };

    const handleNext = () => {
        setCurrentEvent(prev => (prev < events.length - 1 ? prev + 1 : 0));
    };

    const handleAddEvent = () => {
        if (newEvent.year && newEvent.title) {
            setEvents([...events, {
                id: events.length + 1,
                ...newEvent
            }]);
            setNewEvent({
                year: '',
                title: '',
                description: '',
                emoji: '❤️',
                color: 'bg-pink-100',
                image: '/api/placeholder/400/320'
            });
            setIsAdding(false);
        }
    };

    useEffect(() => {
        const backgroundMusic = new Audio(song);
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.4;

        // Auto-play music (may be blocked by browser policies)
        const playPromise = backgroundMusic.play();

        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Auto-play was prevented. Please enable music with the button.");
            });
        }

        // Toggle mute state
        const toggleMute = () => {
            backgroundMusic.muted = isMuted;
        };

        // Watch for mute state changes
        toggleMute();

        return () => {
            backgroundMusic.pause();
            backgroundMusic.src = '';
        };
    }, [isMuted]);

    return (
        <div className="p-6 max-w-4xl mx-auto font-sans">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-pink-600 mb-2">Mom's Amazing Journey</h1>
                <p className="text-gray-600">A celebration of all your incredible achievements and our special memories</p>

                {/* Audio control button */}
                <button
                    className="mt-4 bg-pink-100 hover:bg-pink-200 text-pink-600 p-2 rounded-full transition-all"
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? "Unmute background music" : "Mute background music"}
                >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>

            {/* Timeline visualization */}
            <div className="flex mb-6 relative overflow-hidden">
                <div className="absolute top-4 h-1 bg-pink-200 w-full z-0"></div>
                {events.map((event, index) => (
                    <div
                        key={event.id}
                        className={`relative z-10 flex-1 flex flex-col items-center ${index === currentEvent ? 'scale-110 transition-transform' : ''}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                index === currentEvent ? 'bg-pink-500 text-white' : 'bg-pink-200 text-pink-500'
                            } cursor-pointer`}
                            onClick={() => setCurrentEvent(index)}
                        >
                            {index === currentEvent && <span className="animate-pulse">{event.emoji}</span>}
                        </div>
                        {index === currentEvent && (
                            <div className="text-xs mt-1 text-pink-600 font-bold">{event.year}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Featured event card */}
            <div className="flex items-center justify-center mb-8">
                <button
                    className="mr-4 bg-pink-100 hover:bg-pink-200 text-pink-600 p-2 rounded-full"
                    onClick={handlePrevious}
                >
                    <ChevronLeft size={24} />
                </button>

                <div className={`${events[currentEvent].color} p-6 rounded-lg shadow-lg max-w-md w-full transition-all duration-300`}>
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-2xl mr-2">{events[currentEvent].emoji}</span>
                            <span className="text-sm font-semibold bg-white/50 px-2 py-1 rounded-full">
                {events[currentEvent].year}
              </span>
                        </div>
                    </div>

                    {events[currentEvent].image && (
                        <div className="mb-4 overflow-hidden rounded-lg">
                            <img
                                src={events[currentEvent].image}
                                alt={events[currentEvent].title}
                                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}

                    <h2 className="text-xl font-bold mb-2">{events[currentEvent].title}</h2>
                    <p className="text-gray-700">{events[currentEvent].description}</p>
                </div>

                <button
                    className="ml-4 bg-pink-100 hover:bg-pink-200 text-pink-600 p-2 rounded-full"
                    onClick={handleNext}
                >
                    <ChevronRight size={24} />
                </button>
            </div>



            {/* Footer message */}
            <div className="mt-12 text-center p-4 bg-pink-50 rounded-lg">
                <p className="text-pink-600 font-medium">Happy Mother's Day!</p>
                <p className="text-sm text-gray-600 mt-1">Made with love for the most amazing mom in the world</p>
            </div>
        </div>
    );
}