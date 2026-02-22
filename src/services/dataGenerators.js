// src/services/dataGenerators.js

const generateDateTrend = (days) => {
    const data = [];
    const today = new Date('2026-02-22T12:00:00.000Z');
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        data.push({ date: date.toISOString().split('T')[0] });
    }
    return data;
};

export const generateStableTrend = () => {
    const trendData = generateDateTrend(90);
    return trendData.map((item, index) => {
        const score = 78 + Math.round(Math.sin(index / 5) * 4) + Math.random() * 2;
        return { ...item, score: Math.min(85, Math.max(75, score)) };
    });
};

export const generateDecliningTrend = () => {
    const trendData = generateDateTrend(90);
    return trendData.map((item, index) => {
        let score;
        if (index < 45) {
            score = 78 + Math.round(Math.sin(index / 6) * 3) + Math.random() * 2;
        } else {
            const declineFactor = (index - 44) * 0.45;
            const baseScore = 78 + Math.round(Math.sin(44 / 6) * 3) + Math.random() * 2;
            score = baseScore - declineFactor - Math.random() * 2;
        }
        return { ...item, score: Math.max(50, score) };
    });
};

export const generateNewUserTrend = () => {
    const trendData = generateDateTrend(5);
    return trendData.map((item, index) => {
        const score = 70 + index * 3 + Math.random() * 4;
        return { ...item, score: Math.min(85, score) };
    });
};
