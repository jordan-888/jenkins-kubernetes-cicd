import React, { useState, useEffect } from 'react';
import Header from './Header';
import StockChart from './StockChart';
import MarketNews from './MarketNews';
import MarketOverview from './MarketOverview';
import PortfolioSummary from './PortfolioSummary';

const Dashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [stockData, setStockData] = useState({
    AAPL: { price: 150.25, change: +1.5 },
    GOOGL: { price: 2750.80, change: -0.8 },
    MSFT: { price: 310.45, change: +2.1 },
    AMZN: { price: 3300.20, change: -1.2 },
    TSLA: { price: 228.00, change: +2.7 },
    META: { price: 468.15, change: +1.2 },
    NFLX: { price: 624.80, change: -0.5 },
    NVDA: { price: 721.33, change: +3.2 }
  });

  useEffect(() => {
    // Simulate real-time updates every 5 seconds
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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Dashboard view with stock cards and charts
  const renderDashboardView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-xl font-bold mb-4">Market Movers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(stockData)
              .sort((a, b) => Math.abs(b[1].change) - Math.abs(a[1].change))
              .slice(0, 4)
              .map(([symbol, data]) => (
                <div 
                  key={symbol}
                  className="p-4 rounded-lg border hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-semibold">{symbol}</h2>
                      <p className="text-2xl font-bold">${data.price}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${data.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {data.change >= 0 ? '+' : ''}{data.change}%
                    </span>
                  </div>
                  <StockChart symbol={symbol} data={data} />
                </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Watchlist</h2>
            <div className="space-y-4">
              {Object.entries(stockData)
                .filter(([symbol]) => ['AAPL', 'MSFT', 'GOOGL', 'AMZN'].includes(symbol))
                .map(([symbol, data]) => (
                  <div key={symbol} className="flex justify-between items-center border-b pb-3">
                    <div>
                      <h3 className="font-medium">{symbol}</h3>
                      <p className="text-sm text-gray-500">
                        {symbol === 'AAPL' ? 'Apple Inc.' : 
                         symbol === 'MSFT' ? 'Microsoft Corp.' : 
                         symbol === 'GOOGL' ? 'Alphabet Inc.' : 'Amazon.com Inc.'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${data.price}</p>
                      <p className={`text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {data.change >= 0 ? '+' : ''}{data.change}%
                      </p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Performance</h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Technology</span>
                  <span className="text-sm text-green-600">+2.14%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '72%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Healthcare</span>
                  <span className="text-sm text-green-600">+0.89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '58%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Energy</span>
                  <span className="text-sm text-red-600">-1.27%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Financials</span>
                  <span className="text-sm text-green-600">+0.53%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <MarketNews />
      </div>
    </div>
  );

  // Portfolio view
  const renderPortfolioView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <PortfolioSummary />
      </div>
      <div>
        <MarketNews />
      </div>
    </div>
  );

  // Markets view
  const renderMarketsView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <MarketOverview />
      </div>
      <div>
        <MarketNews />
      </div>
    </div>
  );

  // Render the appropriate view based on the current selection
  const renderCurrentView = () => {
    switch(currentView) {
      case 'portfolio':
        return renderPortfolioView();
      case 'markets':
        return renderMarketsView();
      default:
        return renderDashboardView();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onViewChange={setCurrentView} />
      <main className="container mx-auto px-4 py-6">
        {renderCurrentView()}
      </main>
      <footer className="bg-white shadow-md mt-8 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Financial Dashboard Demo v1.1.0 | Data is simulated for demonstration purposes</p>
          <p className="mt-1">© 2025 Jenkins Kubernetes CI/CD Demo</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;