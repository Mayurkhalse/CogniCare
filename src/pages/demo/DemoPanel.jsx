// src/pages/demo/DemoPanel.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Sliders } from 'lucide-react';

const DemoPanel = () => {
  const { scenario, switchScenario } = useAuth();

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
            <Sliders className="mr-2"/> Demo Control Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Switch the data scenario for the 'sarah@demo.cognicare.app' user account. This will instantly update the user dashboard to reflect the selected state.
        </p>
        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => switchScenario('STABLE')}
            variant={scenario === 'STABLE' ? 'default' : 'secondary'}
          >
            Switch to Stable User
          </Button>
          <Button
            onClick={() => switchScenario('DECLINING')}
             variant={scenario === 'DECLINING' ? 'default' : 'secondary'}
          >
            Switch to Declining User
          </Button>
          <Button
            onClick={() => switchScenario('NEW_USER')}
             variant={scenario === 'NEW_USER' ? 'default' : 'secondary'}
          >
            Switch to New User (Baseline)
          </Button>
        </div>
         <p className="text-sm text-gray-600 pt-4">Current Scenario: <span className="font-bold text-primary">{scenario}</span></p>
      </CardContent>
    </Card>
  );
};

export default DemoPanel;
