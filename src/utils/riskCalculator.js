// src/utils/riskCalculator.js

/**
 * Calculates a risk score from 0-100.
 * A score of 100 means no deviation from baseline.
 * The score decreases as the current score drops below baseline.
 * @param {number} currentScore The user's most recent score.
 * @param {number} baselineAvg The user's average baseline score.
 * @returns {number} A risk score between 0 and 100.
 */
export const calculateRiskScore = (currentScore, baselineAvg) => {
  if (currentScore >= baselineAvg) {
    return 100;
  }
  const diff = baselineAvg - currentScore;
  // Let's say a 30 point drop is a 0 score.
  const score = 100 - (diff / 30) * 100;
  return Math.max(0, Math.round(score));
};

/**
 * Determines the risk level category based on the deviation from baseline.
 * @param {number} currentScore The user's most recent score.
 * @param {number} baselineAvg The user's average baseline score.
 * @returns {'LOW' | 'MEDIUM' | 'HIGH' | 'STABLE'}
 */
export const getRiskLevel = (currentScore, baselineAvg) => {
  const diff = currentScore - baselineAvg;

  if (diff > -8) return 'LOW'; // Includes stable and minor fluctuations
  if (diff >= -15) return 'MEDIUM';
  return 'HIGH';
};

/**
 * Returns color classes based on risk level for Tailwind.
 * @param {'LOW' | 'MEDIUM' | 'HIGH' | 'STABLE' | 'CALCULATING'} riskLevel
 * @returns {{text: string, bg: string, border: string}}
 */
export const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
        case 'HIGH':
            return {
                text: 'text-red-800',
                bg: 'bg-red-100',
                border: 'border-red-500',
                darkBg: 'bg-red-500'
            };
        case 'MEDIUM':
            return {
                text: 'text-yellow-800',
                bg: 'bg-yellow-100',
                border: 'border-yellow-500',
                darkBg: 'bg-yellow-500'
            };
        case 'LOW':
            return {
                text: 'text-green-800',
                bg: 'bg-green-100',
                border: 'border-green-500',
                darkBg: 'bg-green-500'
            };
        default: // STABLE, CALCULATING, etc.
            return {
                text: 'text-gray-800',
                bg: 'bg-gray-100',
                border: 'border-gray-400',
                darkBg: 'bg-gray-500'
            };
    }
};
