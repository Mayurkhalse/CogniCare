// src/services/authService.js
import stableUserData from '../mock-data/stableUser.json';
import decliningUserData from '../mock-data/decliningUser.json';
import newUserData from '../mock-data/newUser.json';

const users = {
  'sarah@demo.cognicare.app': { role: 'USER', scenario: 'STABLE', ...stableUserData.profile },
  'robert@demo.cognicare.app': { role: 'FAMILY', scenario: 'DECLINING', ...decliningUserData.profile },
  'admin@demo.cognicare.app': { role: 'ADMIN', scenario: 'STABLE', name: 'Admin User' },
};

const apiLatency = 500;

export const authService = {
  login: (email) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users[email]) {
          resolve(users[email]);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, apiLatency);
    });
  },
};
