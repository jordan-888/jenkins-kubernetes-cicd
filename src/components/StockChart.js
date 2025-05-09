import React, { useEffect, useState } from 'react';

const StockChart = ({ symbol, data }) => {
  const [chartData, setChartData] = useState([]);
  
  useEffect(() => {
    // Generate initial historical data
    const generateHistoricalData = () => {
      const basePrice = data.price;
      const history = [];
      
      for (let i = 30; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        
        // Create some realistic looking price movements
        const volatility = 0.02; // 2% daily volatility
        const randomChange = (Math.random() * 2 - 1) * volatility;
        const price = basePrice * (1 + randomChange * i);
        
        history.push({
          date: date.toLocaleDateString(),
          price: price.toFixed(2)
        });
      }
      
      return history;
    };
    
    setChartData(generateHistoricalData());
  }, [data.price]);
  
  // Find min and max for scaling
  const prices = chartData.map(item => parseFloat(item.price));
  const minPrice = Math.min(...prices) * 0.99;
  const maxPrice = Math.max(...prices) * 1.01;
  const range = maxPrice - minPrice;
  
  // SVG dimensions
  const height = 150;
  const width = 300;
  
  // Create points for the line
  const points = chartData.map((dataPoint, index) => {
    const x = (index / (chartData.length - 1)) * width;
    const y = height - ((parseFloat(dataPoint.price) - minPrice) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">30-Day History</h3>
      <svg width={width} height={height} className="stock-chart">
        <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={data.change >= 0 ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'} />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
        </linearGradient>
        
        {/* Area under the line */}
        <path
          d={`M0,${height} ${points} ${width},${height} Z`}
          fill={`url(#gradient-${symbol})`}
        />
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={data.change >= 0 ? '#10B981' : '#EF4444'}
          strokeWidth="2"
        />
        
        {/* Current price dot */}
        <circle
          cx={width}
          cy={height - ((parseFloat(data.price) - minPrice) / range) * height}
          r="4"
          fill={data.change >= 0 ? '#10B981' : '#EF4444'}
        />
      </svg>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{chartData[0]?.date}</span>
        <span>{chartData[chartData.length - 1]?.date}</span>
      </div>
    </div>
  );
};

export default StockChart;
