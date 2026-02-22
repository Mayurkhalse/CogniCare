// src/utils/gameUtils.js

export const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
}

export const generateMemoryMatchDeck = () => {
    const emojis = ['🧠', '💊', '🧬', '❤️', '🩺', '🔬', '💡', '📈'];
    const deck = [...emojis, ...emojis].map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
    }));
    return shuffleArray(deck);
}
