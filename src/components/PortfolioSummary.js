import React from 'react';

const PortfolioSummary = () => {
  const portfolioValue = 128750.42;
  const portfolioChange = 3250.18;
  const portfolioChangePercent = 2.59;
  
  const holdings = [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 25, value: 3756.25, change: 37.50, changePercent: 1.01 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 15, value: 4656.75, change: 31.50, changePercent: 0.68 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 10, value: 27508.00, change: -80.00, changePercent: -0.29 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', shares: 12, value: 39602.40, change: -144.00, changePercent: -0.36 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 20, value: 4560.00, change: 120.00, changePercent: 2.70 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Portfolio Summary</h2>
      
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Total Value</div>
            <div className="text-2xl font-bold">${portfolioValue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Today's Change</div>
            <div className="flex items-center">
              <span className={`text-xl font-semibold ${portfolioChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${Math.abs(portfolioChange).toLocaleString()}
              </span>
              <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                portfolioChange >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {portfolioChange >= 0 ? '+' : '-'}{Math.abs(portfolioChangePercent).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <h3 className="text-md font-semibold mb-2">Holdings</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Symbol</th>
              <th className="text-left py-2">Shares</th>
              <th className="text-right py-2">Value</th>
              <th className="text-right py-2">Change</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">
                  <div className="font-medium">{holding.symbol}</div>
                  <div className="text-xs text-gray-500">{holding.name}</div>
                </td>
                <td className="py-2">{holding.shares}</td>
                <td className="text-right py-2">${holding.value.toLocaleString()}</td>
                <td className="text-right py-2">
                  <div className={`${holding.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {holding.change >= 0 ? '+' : ''}{holding.changePercent.toFixed(2)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioSummary;
