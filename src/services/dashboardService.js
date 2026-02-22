// src/services/dashboardService.js
import stableUserData from '../mock-data/stableUser.json';
import decliningUserData from '../mock-data/decliningUser.json';
import newUserData from '../mock-data/newUser.json';
import specialistsData from '../mock-data/specialists.json';
import { 
  generateStableTrend, 
  generateDecliningTrend, 
  generateNewUserTrend 
} from './dataGenerators';

const apiLatency = 800;

const dataMap = {
  STABLE: { ...stableUserData, trend: generateStableTrend() },
  DECLINING: { ...decliningUserData, trend: generateDecliningTrend() },
  NEW_USER: { ...newUserData, trend: generateNewUserTrend() },
};

export const dashboardService = {
  getUserDashboard: (scenario) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataMap[scenario] || dataMap['STABLE']);
      }, apiLatency);
    });
  },
  
  getFamilyDashboard: () => {
     return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dataMap['DECLINING']);
      }, apiLatency);
    });
  },

  getSpecialists: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(specialistsData);
      }, apiLatency);
    });
  },
};
