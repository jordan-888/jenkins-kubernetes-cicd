import React from 'react';

const MarketNews = () => {
  const news = [
    {
      id: 1,
      title: "Fed signals potential rate cuts amid cooling inflation",
      source: "Financial Times",
      time: "2 hours ago",
      impact: "positive"
    },
    {
      id: 2,
      title: "Tech stocks rally as earnings exceed expectations",
      source: "Wall Street Journal",
      time: "4 hours ago",
      impact: "positive"
    },
    {
      id: 3,
      title: "Oil prices drop on increased supply concerns",
      source: "Bloomberg",
      time: "6 hours ago",
      impact: "negative"
    },
    {
      id: 4,
      title: "Global supply chain issues show signs of easing",
      source: "Reuters",
      time: "8 hours ago",
      impact: "positive"
    },
    {
      id: 5,
      title: "Retail sales decline for second consecutive month",
      source: "CNBC",
      time: "10 hours ago",
      impact: "negative"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Market News</h2>
      <div className="space-y-4">
        {news.map(item => (
          <div key={item.id} className="border-b pb-3 last:border-b-0">
            <h3 className="font-medium">{item.title}</h3>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-500">{item.source}</span>
              <span className="text-sm text-gray-500">{item.time}</span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              item.impact === 'positive' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {item.impact === 'positive' ? 'Bullish' : 'Bearish'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketNews;
