// src/services/gameService.js

const apiLatency = 300;

export const gameService = {
  saveGameResult: (result) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Game result saved:', result);
        resolve({ success: true, message: 'Game result saved successfully.' });
      }, apiLatency);
    });
  },
};
