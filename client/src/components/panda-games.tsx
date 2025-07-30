import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, RotateCcw, Star, Heart, Trophy } from 'lucide-react';

interface PandaGamesProps {
  isOpen: boolean;
  onClose: () => void;
}

type GameType = 'memory' | 'catch' | 'sequence' | null;

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CatchItem {
  id: number;
  x: number;
  y: number;
  type: 'coin' | 'heart' | 'star';
  emoji: string;
}

export function PandaGames({ isOpen, onClose }: PandaGamesProps) {
  const [currentGame, setCurrentGame] = useState<GameType>(null);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  // Memory Game State
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  // Catch Game State
  const [catchItems, setCatchItems] = useState<CatchItem[]>([]);
  const [pandaPosition, setPandaPosition] = useState(50);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Sequence Game State
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const gameEmojis = ['🎋', '🎓', '📚', '💰', '⭐', '🏆', '💎', '🎯'];

  const initializeMemoryGame = () => {
    const shuffledEmojis = [...gameEmojis.slice(0, 6), ...gameEmojis.slice(0, 6)]
      .sort(() => Math.random() - 0.5);
    
    const cards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
      isFlipped: false,
      isMatched: false,
    }));
    
    setMemoryCards(cards);
    setFlippedCards([]);
    setMoves(0);
    setScore(0);
  };

  const initializeCatchGame = () => {
    setCatchItems([]);
    setPandaPosition(50);
    setScore(0);
  };

  const initializeSequenceGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setShowingSequence(false);
    setActiveButton(null);
    setScore(0);
  };

  const startGame = (gameType: GameType) => {
    setCurrentGame(gameType);
    setGameStarted(true);
    
    switch (gameType) {
      case 'memory':
        initializeMemoryGame();
        break;
      case 'catch':
        initializeCatchGame();
        break;
      case 'sequence':
        initializeSequenceGame();
        setTimeout(() => startSequenceRound(), 1000);
        break;
    }
  };

  const resetGame = () => {
    setCurrentGame(null);
    setGameStarted(false);
    setScore(0);
  };

  // Memory Game Logic
  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2 || memoryCards[cardId].isMatched || flippedCards.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    const newCards = memoryCards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setMemoryCards(newCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      
      setTimeout(() => {
        const [first, second] = newFlippedCards;
        if (memoryCards[first].emoji === memoryCards[second].emoji) {
          // Match found
          setMemoryCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setScore(prev => prev + 100);
        } else {
          // No match
          setMemoryCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, isFlipped: false }
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  // Catch Game Logic
  useEffect(() => {
    if (currentGame === 'catch' && gameStarted) {
      const interval = setInterval(() => {
        const newItem: CatchItem = {
          id: Date.now(),
          x: Math.random() * 90,
          y: 0,
          type: ['coin', 'heart', 'star'][Math.floor(Math.random() * 3)] as 'coin' | 'heart' | 'star',
          emoji: ['💰', '❤️', '⭐'][Math.floor(Math.random() * 3)]
        };
        setCatchItems(prev => [...prev, newItem]);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [currentGame, gameStarted]);

  useEffect(() => {
    if (currentGame === 'catch') {
      const interval = setInterval(() => {
        setCatchItems(prev => 
          prev.map(item => ({ ...item, y: item.y + 2 }))
            .filter(item => {
              if (item.y > 85 && Math.abs(item.x - pandaPosition) < 10) {
                setScore(prev => prev + (item.type === 'star' ? 50 : item.type === 'heart' ? 30 : 20));
                return false;
              }
              return item.y < 100;
            })
        );
      }, 50);

      return () => clearInterval(interval);
    }
  }, [currentGame, pandaPosition]);

  const movePanda = (direction: 'left' | 'right') => {
    setPandaPosition(prev => {
      if (direction === 'left') return Math.max(0, prev - 10);
      return Math.min(90, prev + 10);
    });
  };

  // Sequence Game Logic
  const startSequenceRound = () => {
    const newNumber = Math.floor(Math.random() * 4);
    const newSequence = [...sequence, newNumber];
    setSequence(newSequence);
    setPlayerSequence([]);
    showSequence(newSequence);
  };

  const showSequence = (seq: number[]) => {
    setShowingSequence(true);
    seq.forEach((num, index) => {
      setTimeout(() => {
        setActiveButton(num);
        setTimeout(() => setActiveButton(null), 400);
      }, (index + 1) * 600);
    });
    
    setTimeout(() => {
      setShowingSequence(false);
    }, seq.length * 600 + 500);
  };

  const handleSequenceClick = (buttonIndex: number) => {
    if (showingSequence) return;
    
    const newPlayerSequence = [...playerSequence, buttonIndex];
    setPlayerSequence(newPlayerSequence);
    
    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      // Wrong sequence
      setTimeout(() => {
        alert('Wrong sequence! Game over.');
        resetGame();
      }, 500);
      return;
    }
    
    if (newPlayerSequence.length === sequence.length) {
      // Round completed
      setScore(prev => prev + sequence.length * 10);
      setTimeout(() => startSequenceRound(), 1000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-slate-900/95 border-emerald-400/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-light text-white">🐼 Panda Mini-Games</h2>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-white hover:bg-emerald-400/10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {!currentGame ? (
          <div className="space-y-6">
            <p className="text-slate-300 text-lg text-center mb-8">
              Take a break with our friendly panda! Choose a mini-game:
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Button
                onClick={() => startGame('memory')}
                className="h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 border border-emerald-400/30 hover:bg-emerald-400/30 text-white flex flex-col items-center gap-3"
              >
                <span className="text-3xl">🧠</span>
                <div className="text-center">
                  <div className="font-medium">Memory Match</div>
                  <div className="text-sm opacity-80">Match school items</div>
                </div>
              </Button>

              <Button
                onClick={() => startGame('catch')}
                className="h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 border border-emerald-400/30 hover:bg-emerald-400/30 text-white flex flex-col items-center gap-3"
              >
                <span className="text-3xl">🎯</span>
                <div className="text-center">
                  <div className="font-medium">Panda Catch</div>
                  <div className="text-sm opacity-80">Catch falling items</div>
                </div>
              </Button>

              <Button
                onClick={() => startGame('sequence')}
                className="h-32 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 border border-emerald-400/30 hover:bg-emerald-400/30 text-white flex flex-col items-center gap-3"
              >
                <span className="text-3xl">🔢</span>
                <div className="text-center">
                  <div className="font-medium">Sequence Memory</div>
                  <div className="text-sm opacity-80">Remember the pattern</div>
                </div>
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {/* Game Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <span className="text-2xl">🐼</span>
                <div>
                  <div className="text-white font-medium">
                    {currentGame === 'memory' && 'Memory Match'}
                    {currentGame === 'catch' && 'Panda Catch'}
                    {currentGame === 'sequence' && 'Sequence Memory'}
                  </div>
                  <div className="text-emerald-400">Score: {score}</div>
                </div>
              </div>
              <Button
                onClick={resetGame}
                variant="ghost"
                className="text-white hover:bg-emerald-400/10"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Game
              </Button>
            </div>

            {/* Memory Game */}
            {currentGame === 'memory' && (
              <div className="space-y-4">
                <div className="text-center text-slate-300">
                  Moves: {moves} | Find all matching pairs!
                </div>
                <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                  {memoryCards.map((card) => (
                    <Button
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      className={`aspect-square text-2xl border-2 transition-all duration-300 ${
                        card.isFlipped || card.isMatched
                          ? 'bg-emerald-400/20 border-emerald-400/50'
                          : 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50'
                      }`}
                    >
                      {card.isFlipped || card.isMatched ? card.emoji : '🐼'}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Catch Game */}
            {currentGame === 'catch' && (
              <div className="space-y-4">
                <div className="text-center text-slate-300">
                  Move the panda to catch falling items!
                </div>
                <div 
                  ref={gameAreaRef}
                  className="relative h-80 bg-gradient-to-b from-blue-900/20 to-green-900/20 border border-emerald-400/30 rounded-lg overflow-hidden"
                >
                  {/* Falling Items */}
                  {catchItems.map(item => (
                    <div
                      key={item.id}
                      className="absolute text-2xl transition-all duration-75 ease-linear"
                      style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    >
                      {item.emoji}
                    </div>
                  ))}
                  
                  {/* Panda */}
                  <div
                    className="absolute bottom-2 text-4xl transition-all duration-200"
                    style={{ left: `${pandaPosition}%` }}
                  >
                    🐼
                  </div>
                </div>
                
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => movePanda('left')}
                    className="bg-emerald-400/20 border border-emerald-400/30 hover:bg-emerald-400/30 text-white"
                  >
                    ← Left
                  </Button>
                  <Button
                    onClick={() => movePanda('right')}
                    className="bg-emerald-400/20 border border-emerald-400/30 hover:bg-emerald-400/30 text-white"
                  >
                    Right →
                  </Button>
                </div>
              </div>
            )}

            {/* Sequence Game */}
            {currentGame === 'sequence' && (
              <div className="space-y-6">
                <div className="text-center text-slate-300">
                  {showingSequence ? 'Watch the sequence...' : 'Repeat the sequence!'}
                </div>
                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
                  {[0, 1, 2, 3].map((buttonIndex) => (
                    <Button
                      key={buttonIndex}
                      onClick={() => handleSequenceClick(buttonIndex)}
                      disabled={showingSequence}
                      className={`aspect-square text-3xl transition-all duration-200 ${
                        activeButton === buttonIndex
                          ? 'bg-emerald-400 border-emerald-300 scale-110'
                          : 'bg-slate-700/50 border-slate-600 hover:bg-slate-600/50'
                      }`}
                    >
                      {['🎋', '🎓', '📚', '💰'][buttonIndex]}
                    </Button>
                  ))}
                </div>
                <div className="text-center text-slate-400 text-sm">
                  Round: {sequence.length}
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}