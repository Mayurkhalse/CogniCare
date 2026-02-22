// src/components/games/WordRecall.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../common/Button';
import { gameService } from '../../services/gameService';
import { CheckCircle, Brain, Puzzle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleArray } from '../../utils/gameUtils';

const wordsToMemorize = shuffleArray(['Galaxy', 'Mountain', 'River', 'Forest', 'Ocean', 'Desert', 'Quantum', 'Nebula', 'Symphony', 'Velvet']).slice(0, 5);
const distractQuestions = [
    { q: '12 + 19 = ?', a: '31' },
    { q: '8 x 7 = ?', a: '56' },
    { q: '100 - 43 = ?', a: '57' },
]

const WordRecall = () => {
  const [phase, setPhase] = useState('intro'); // intro, memorize, distract, recall, results
  const [countdown, setCountdown] = useState(15);
  const [distractIdx, setDistractIdx] = useState(0);
  const [distractAnswer, setDistractAnswer] = useState('');
  const [recalledWords, setRecalledWords] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    let timer;
    if (phase === 'memorize' && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (phase === 'memorize' && countdown === 0) {
      setPhase('distract');
    }
    return () => clearTimeout(timer);
  }, [phase, countdown]);
  
  const handleDistractSubmit = () => {
      // Basic validation
      if(distractAnswer === distractQuestions[distractIdx].a) {
          if (distractIdx < distractQuestions.length - 1) {
              setDistractIdx(distractIdx + 1);
              setDistractAnswer('');
          } else {
              setPhase('recall');
          }
      } else {
          // just move on for this demo
           if (distractIdx < distractQuestions.length - 1) {
              setDistractIdx(distractIdx + 1);
              setDistractAnswer('');
          } else {
              setPhase('recall');
          }
      }
  }

  const handleRecallSubmit = () => {
    const userWords = recalledWords.split(',').map(w => w.trim().toLowerCase());
    const correctWords = wordsToMemorize.filter(w => userWords.includes(w.toLowerCase()));
    const finalScore = Math.round((correctWords.length / wordsToMemorize.length) * 100);
    setScore(finalScore);
    gameService.saveGameResult({ game: 'WordRecall', score: finalScore });
    setPhase('results');
  };

  const resetGame = () => {
      setPhase('intro');
      setCountdown(15);
      setDistractIdx(0);
      setDistractAnswer('');
      setRecalledWords('');
      setScore(0);
  }
  
  const renderPhase = () => {
      switch(phase) {
          case 'intro':
              return (
                  <div className="text-center">
                    <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-4">Word Recall Challenge</h2>
                    <p className="mb-6">You will have 15 seconds to memorize a list of words. Afterwards, you'll solve a few simple problems, then recall the words.</p>
                    <Button onClick={() => setPhase('memorize')}>Start Challenge</Button>
                  </div>
              )
          case 'memorize':
              return (
                  <div>
                    <h3 className="text-lg font-semibold text-center mb-2">Memorize these words:</h3>
                    <div className="text-center text-3xl font-bold my-8 space-y-4">
                        {wordsToMemorize.map(word => <p key={word}>{word}</p>)}
                    </div>
                    <div className="text-center text-5xl font-bold text-red-500 mt-8">{countdown}</div>
                  </div>
              )
          case 'distract':
              return (
                  <div>
                    <Puzzle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-center mb-4">Quick! Solve this:</h3>
                    <p className="text-center text-4xl font-bold my-6">{distractQuestions[distractIdx].q}</p>
                    <input type="text" value={distractAnswer} onChange={e => setDistractAnswer(e.target.value)} className="w-full p-2 border rounded text-center text-2xl"/>
                    <Button onClick={handleDistractSubmit} className="w-full mt-4">Submit</Button>
                  </div>
              )
          case 'recall':
              return (
                  <div>
                    <h3 className="text-lg font-semibold text-center mb-4">Recall the words</h3>
                    <p className="text-center text-sm text-gray-500 mb-4">Enter the words you remember, separated by commas.</p>
                    <textarea value={recalledWords} onChange={e => setRecalledWords(e.target.value)} className="w-full p-2 border rounded" rows="5"></textarea>
                    <Button onClick={handleRecallSubmit} className="w-full mt-4">Finish</Button>
                  </div>
              )
          case 'results':
              return (
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
                    <p className="text-4xl font-bold my-4">Your Score: {score}/100</p>
                    <p className="text-gray-600">You correctly recalled { (score / 100) * wordsToMemorize.length } out of {wordsToMemorize.length} words.</p>
                    <Button onClick={resetGame} className="mt-6">Play Again</Button>
                  </div>
              )
          default:
              return null;
      }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
        <AnimatePresence mode="wait">
            <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                {renderPhase()}
            </motion.div>
        </AnimatePresence>
    </div>
  );
};

export default WordRecall;
