import React, { useState } from 'react';

const Header = ({ onViewChange }) => {
  const [activeView, setActiveView] = useState('dashboard');
  
  const handleViewChange = (view) => {
    setActiveView(view);
    onViewChange(view);
  };
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            <h1 className="text-xl font-bold">Financial Dashboard</h1>
          </div>
          
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <button 
              onClick={() => handleViewChange('dashboard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'dashboard' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleViewChange('portfolio')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'portfolio' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => handleViewChange('markets')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeView === 'markets' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Markets
            </button>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-8 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 absolute left-2 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
