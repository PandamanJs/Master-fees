import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PandaReaction {
  id: string;
  type: 'happy' | 'excited' | 'surprised' | 'dancing' | 'thumbsup';
  x: number;
  y: number;
  timestamp: number;
}

interface DashboardEasterEggsProps {
  onReaction?: (type: string) => void;
}

export default function DashboardEasterEggs({ onReaction }: DashboardEasterEggsProps) {
  const [reactions, setReactions] = useState<PandaReaction[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [konami, setKonami] = useState<string[]>([]);
  const [showSpecialPanda, setShowSpecialPanda] = useState(false);

  // Panda emojis and expressions
  const pandaReactions = {
    happy: '🐼😊',
    excited: '🐼🎉',
    surprised: '🐼😮',
    dancing: '🐼💃',
    thumbsup: '🐼👍'
  };

  // Konami code sequence
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

  // Easter egg click counter
  const handleClick = (event: React.MouseEvent) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    // Create reaction at click position
    const reactionTypes: (keyof typeof pandaReactions)[] = ['happy', 'excited', 'surprised', 'dancing', 'thumbsup'];
    let reactionType: keyof typeof pandaReactions = 'happy';

    // Special reactions based on click count
    if (newCount === 5) {
      reactionType = 'surprised';
    } else if (newCount === 10) {
      reactionType = 'excited';
    } else if (newCount === 15) {
      reactionType = 'dancing';
    } else if (newCount >= 20) {
      reactionType = 'thumbsup';
    } else {
      reactionType = reactionTypes[Math.floor(Math.random() * reactionTypes.length)];
    }

    const newReaction: PandaReaction = {
      id: `${Date.now()}-${Math.random()}`,
      type: reactionType,
      x: event.clientX,
      y: event.clientY,
      timestamp: Date.now()
    };

    setReactions(prev => [...prev, newReaction]);
    onReaction?.(reactionType);

    // Remove reaction after 3 seconds
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 3000);

    // Special surprise at 25 clicks
    if (newCount === 25) {
      setShowSpecialPanda(true);
      setTimeout(() => setShowSpecialPanda(false), 5000);
    }
  };

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newKonami = [...konami, event.code].slice(-konamiCode.length);
      setKonami(newKonami);

      if (JSON.stringify(newKonami) === JSON.stringify(konamiCode)) {
        // Activate special panda mode
        setShowSpecialPanda(true);
        setClickCount(100); // Reset to high number for special effects
        
        // Create multiple reactions
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            const specialReaction: PandaReaction = {
              id: `konami-${Date.now()}-${i}`,
              type: 'dancing',
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              timestamp: Date.now()
            };
            setReactions(prev => [...prev, specialReaction]);
          }, i * 200);
        }

        setTimeout(() => {
          setShowSpecialPanda(false);
          setReactions([]);
        }, 8000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konami]);

  // Auto-clear old reactions
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setReactions(prev => prev.filter(r => now - r.timestamp < 5000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Random panda appearances (rare)
  useEffect(() => {
    const randomAppearance = () => {
      if (Math.random() < 0.02) { // 2% chance every 5 seconds
        const randomReaction: PandaReaction = {
          id: `random-${Date.now()}`,
          type: 'happy',
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          timestamp: Date.now()
        };
        setReactions(prev => [...prev, randomReaction]);
        
        setTimeout(() => {
          setReactions(prev => prev.filter(r => r.id !== randomReaction.id));
        }, 2000);
      }
    };

    const interval = setInterval(randomAppearance, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50"
      style={{ pointerEvents: 'none' }}
    >
      {/* Click overlay to capture interactions */}
      <div 
        className="absolute inset-0 pointer-events-auto opacity-0"
        onClick={handleClick}
        style={{ pointerEvents: 'auto' }}
      />

      {/* Reaction animations */}
      <AnimatePresence>
        {reactions.map((reaction) => (
          <motion.div
            key={reaction.id}
            initial={{ 
              scale: 0,
              opacity: 0,
              x: reaction.x - 25,
              y: reaction.y - 25
            }}
            animate={{ 
              scale: [0, 1.2, 1],
              opacity: [0, 1, 1, 0],
              y: reaction.y - 100,
              rotate: reaction.type === 'dancing' ? [0, 10, -10, 0] : 0
            }}
            exit={{ 
              scale: 0,
              opacity: 0 
            }}
            transition={{ 
              duration: 3,
              ease: "easeOut",
              rotate: {
                duration: 0.5,
                repeat: reaction.type === 'dancing' ? Infinity : 0,
                repeatType: "reverse"
              }
            }}
            className="absolute text-4xl pointer-events-none select-none"
            style={{
              fontSize: reaction.type === 'dancing' ? '3rem' : '2rem',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          >
            {pandaReactions[reaction.type]}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Special panda celebration */}
      <AnimatePresence>
        {showSpecialPanda && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 2, 1.5],
              opacity: [0, 1, 1],
              rotate: [0, 360, 0]
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              duration: 2,
              rotate: { duration: 1, repeat: 4 }
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl pointer-events-none select-none z-60"
            style={{
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }}
          >
            🐼🎊✨
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click counter indicator (subtle) */}
      {clickCount > 0 && clickCount < 25 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          className="absolute bottom-4 right-4 bg-brand-mint/90 text-brand-teal px-3 py-1 rounded-full text-xs font-medium pointer-events-none"
        >
          Panda clicks: {clickCount}
        </motion.div>
      )}

      {/* Konami code hint (very subtle) */}
      {clickCount > 10 && !showSpecialPanda && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          className="absolute bottom-4 left-4 text-xs text-slate-400 pointer-events-none"
        >
          Try the Konami code... 🐼
        </motion.div>
      )}
    </div>
  );
}