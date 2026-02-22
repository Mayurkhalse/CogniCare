// src/components/games/MemoryMatch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { generateMemoryMatchDeck } from '../../utils/gameUtils';
import { Button } from '../common/Button';
import { gameService } from '../../services/gameService';
import { Timer, CheckCircle } from 'lucide-react';

const Card = ({ card, onFlip, isFlipped, isMatched }) => {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card);
    }
  };

  return (
    <motion.div
      className="w-full h-full cursor-pointer"
      onClick={handleClick}
      animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute w-full h-full bg-primary rounded-lg flex items-center justify-center backface-hidden">
        {/* Back of card */}
      </div>
      <div className="absolute w-full h-full bg-white rounded-lg flex items-center justify-center text-4xl" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
        {card.emoji}
      </div>
    </motion.div>
  );
};

const MemoryMatch = () => {
  const [cards, setCards] = useState(generateMemoryMatchDeck());
  const [flipped, setFlipped] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isGameStarted && !isGameWon) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isGameStarted, isGameWon]);
  
  useEffect(() => {
    if (cards.every(c => c.isMatched)) {
      setIsGameWon(true);
      gameService.saveGameResult({ game: 'MemoryMatch', score: calculateScore() });
    }
  }, [cards]);

  const handleFlip = (card) => {
    if (flipped.length === 2) return;
    
    setCards(prev => prev.map(c => (c.id === card.id ? { ...c, isFlipped: true } : c)));
    const newFlipped = [...flipped, card];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      if (newFlipped[0].emoji === newFlipped[1].emoji) {
        // Match
        setCards(prev =>
          prev.map(c =>
            c.emoji === newFlipped[0].emoji ? { ...c, isMatched: true, isFlipped: false } : c
          )
        );
        setFlipped([]);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev =>
            prev.map(c => (c.isMatched ? c : { ...c, isFlipped: false }))
          );
          setFlipped([]);
        }, 1200);
      }
    }
  };

  const calculateScore = () => {
    const timeBonus = Math.max(0, 100 - time);
    const moveBonus = Math.max(0, 50 - (moves * 2));
    return timeBonus + moveBonus;
  }
  
  const startGame = () => {
    setIsGameStarted(true);
  }
  
  const resetGame = () => {
    setCards(generateMemoryMatchDeck());
    setFlipped([]);
    setMoves(0);
    setTime(0);
    setIsGameWon(false);
    setIsGameStarted(true);
  }

  if (!isGameStarted) {
    return (
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Memory Match</h2>
            <p className="mb-6">Match all the pairs of cards. Ready?</p>
            <Button onClick={startGame}>Start Game</Button>
        </div>
    )
  }

  if (isGameWon) {
      return (
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
              <p className="mb-4">You've completed the game.</p>
              <div className="flex justify-center space-x-8 text-lg">
                  <div><span className="font-bold">Time:</span> {time}s</div>
                  <div><span className="font-bold">Moves:</span> {moves}</div>
                  <div><span className="font-bold">Score:</span> {calculateScore()}</div>
              </div>
              <Button onClick={resetGame} className="mt-6">Play Again</Button>
          </div>
      )
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4 p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold text-primary">Memory Match</h2>
            <div className="flex space-x-6">
                <div className="font-semibold">Moves: <span className="font-normal">{moves}</span></div>
                <div className="font-semibold flex items-center"><Timer size={18} className="mr-1" /> <span className="font-normal">{time}s</span></div>
            </div>
        </div>
        <div className="grid grid-cols-4 gap-4" style={{ perspective: '1000px' }}>
            {cards.map(card => (
            <div key={card.id} className="aspect-square">
                <Card
                    card={card}
                    onFlip={handleFlip}
                    isFlipped={flipped.some(f => f.id === card.id)}
                    isMatched={card.isMatched}
                />
            </div>
            ))}
        </div>
    </div>
  );
};

export default MemoryMatch;
