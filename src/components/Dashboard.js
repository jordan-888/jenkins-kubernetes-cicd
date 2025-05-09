import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stockData, setStockData] = useState({
    AAPL: { price: 150.25, change: +1.5 },
    GOOGL: { price: 2750.80, change: -0.8 },
    MSFT: { price: 310.45, change: +2.1 },
    AMZN: { price: 3300.20, change: -1.2 }
  });

  useEffect(() => {
    // Simulate real-time updates every 3 seconds
    const interval = setInterval(() => {
      setStockData(prev => {
        const newData = { ...prev };
        Object.keys(newData).forEach(symbol => {
          const change = (Math.random() * 2 - 1).toFixed(2);
          newData[symbol] = {
            price: +(newData[symbol].price + parseFloat(change)).toFixed(2),
            change: +change
          };
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Financial Dashboard Demo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(stockData).map(([symbol, data]) => (
          <div 
            key={symbol}
            className="p-4 rounded-lg shadow-md border"
          >
            <h2 className="text-xl font-semibold">{symbol}</h2>
            <p className="text-2xl">${data.price}</p>
            <p className={`${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {data.change >= 0 ? '+' : ''}{data.change}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;