import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function VideoModal() {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-10 text-white hover:text-red-500 transition-colors bg-black/50 rounded-full p-2"
                >
                    <FaTimes size={24} />
                </button>

                {/* Video Container */}
                <div className="relative pt-[56.25%]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/lhlEThNEC2U?autoplay=1"
                        title="ISSAT Kairouan Presentation"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default VideoModal;
