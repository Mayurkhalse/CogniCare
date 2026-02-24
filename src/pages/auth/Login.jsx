// src/pages/auth/Login.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { BrainCircuit } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please use a demo account.');
    }
  };
  
  const handleDemoLogin = (demoEmail) => {
      setEmail(demoEmail);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <div className="text-center">
            <BrainCircuit className="w-12 h-12 mx-auto text-primary" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">CogniCare</h1>
            <p className="mt-2 text-sm text-gray-600">Early Cognitive Health Monitoring</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Enter demo email"
            />
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div>
            <Button type="submit" className="w-full border hover:scale-105 transition-transform duration-200">
              Sign In
            </Button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-500">
            <p className="font-semibold mb-2">Demo Accounts:</p>
            <div className="space-y-2">
                <button onClick={() => handleDemoLogin('sarah@demo.cognicare.app')} className="text-primary hover:underline">sarah@demo.cognicare.app (User)</button>
                
                
                <button onClick={() => handleDemoLogin('robert@demo.cognicare.app')} className="text-primary hover:underline">robert@demo.cognicare.app (Family)</button>
                
                <button onClick={() => handleDemoLogin('admin@demo.cognicare.app')} className="text-primary hover:underline">admin@demo.cognicare.app (Admin)</button>
                <p></p>
                <p></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
