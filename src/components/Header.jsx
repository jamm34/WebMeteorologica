import { useState, useEffect } from 'react';
import { WiDaySunny } from "react-icons/wi";

const words = ["JAM WeatherX", "Tu clima en tiempo real", "Temperatura, Humedad y Presión"];

export default function Header() {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        // Adjust speed for a more natural feel
        const typeSpeed = isDeleting ? 80 : 150;

        const handleTyping = () => {
            if (isDeleting) {
                // Deleting
                if (text.length > 0) {
                    setText(current => current.substring(0, current.length - 1));
                } else {
                    setIsDeleting(false);
                    setWordIndex(current => (current + 1) % words.length);
                }
            } else {
                // Typing
                if (text.length < currentWord.length) {
                    setText(current => currentWord.substring(0, text.length + 1));
                } else {
                    // Pause at the end of the word before starting to delete
                    setTimeout(() => setIsDeleting(true), 2500);
                }
            }
        };

        const timer = setTimeout(handleTyping, typeSpeed);

        return () => clearTimeout(timer);

    }, [text, isDeleting, wordIndex]);

    return (
        <header className="bg-white shadow-md p-4 flex items-center gap-3">
            <WiDaySunny size={60} className="text-yellow-500 animate-pulse cursor-pointer" />
            <h1 className="text-2xl font-bold hover:text-blue-600 transition-colors duration-200 cursor-pointer min-h-[32px]">
                {text}
                <span className="opacity-50 animate-pulse">|</span>
            </h1>
        </header>
    );
}
