import React from 'react';

const MarketOverview = () => {
  const indices = [
    { name: 'S&P 500', value: '4,892.38', change: '+1.23%', trend: 'up' },
    { name: 'Nasdaq', value: '16,742.39', change: '+1.87%', trend: 'up' },
    { name: 'Dow Jones', value: '38,654.42', change: '+0.76%', trend: 'up' },
    { name: 'Russell 2000', value: '2,038.29', change: '-0.41%', trend: 'down' }
  ];

  const sectors = [
    { name: 'Technology', change: '+2.14%', trend: 'up' },
    { name: 'Healthcare', change: '+0.89%', trend: 'up' },
    { name: 'Financials', change: '+0.53%', trend: 'up' },
    { name: 'Energy', change: '-1.27%', trend: 'down' },
    { name: 'Consumer Cyclical', change: '+1.05%', trend: 'up' },
    { name: 'Utilities', change: '-0.38%', trend: 'down' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Market Overview</h2>
      
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">Major Indices</h3>
        <div className="grid grid-cols-2 gap-3">
          {indices.map((index, i) => (
            <div key={i} className="border rounded-md p-3">
              <div className="text-sm text-gray-600">{index.name}</div>
              <div className="text-lg font-semibold">{index.value}</div>
              <div className={`text-sm ${index.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {index.change}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-semibold mb-2">Sectors</h3>
        <div className="space-y-2">
          {sectors.map((sector, i) => (
            <div key={i} className="flex justify-between items-center border-b pb-2">
              <span>{sector.name}</span>
              <span className={`${sector.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {sector.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
