import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Reference the user's specific music file
    const audioUrl = '/Homepagemusic.mp3';
    
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.volume = 0.2;
    audioRef.current = audio;

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => console.log("Playback failed:", err));
        
        removeListeners();
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      removeListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Toggle play failed:", err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <button
        onClick={toggleMute}
        className="flex items-center justify-center p-4 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-white transition-all duration-300 shadow-2xl group relative"
        aria-label={isPlaying ? "Mute music" : "Play music"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        ) : (
          <VolumeX className="w-5 h-5 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
};
