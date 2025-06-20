import { useQuery } from "@tanstack/react-query";
import { Star, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onStockSelect: (stock: any) => void;
}

export default function Sidebar({ onStockSelect }: SidebarProps) {
  const { data: favorites } = useQuery({
    queryKey: ['/api/favorites'],
  });

  const { data: stocks } = useQuery({
    queryKey: ['/api/stocks'],
  });

  const { data: currencies } = useQuery({
    queryKey: ['/api/currencies'],
  });

  // Get favorite stocks (first 3 for display)
  const favoriteStocks = stocks?.slice(0, 3) || [];
  
  // Get currency pairs (first 3 for display)
  const favoriteCurrencies = currencies?.slice(0, 3) || [];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Access</h2>
        
        {/* Favorites Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            Favorites
          </h3>
          <div className="space-y-1">
            {favoriteStocks.map((stock: any) => (
              <div
                key={stock.symbol}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
                onClick={() => onStockSelect(stock)}
              >
                <div>
                  <div className="text-sm font-medium">{stock.symbol}</div>
                  <div className="text-xs text-gray-500">${stock.price}</div>
                </div>
                <div className={`text-xs flex items-center ${
                  parseFloat(stock.changePercent) >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(stock.changePercent) >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {stock.changePercent}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Pairs */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Currency Pairs
          </h3>
          <div className="space-y-1">
            {favoriteCurrencies.map((pair: any) => (
              <div
                key={pair.symbol}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <div className="text-sm font-medium">{pair.symbol}</div>
                <div className="text-sm">{parseFloat(pair.rate).toFixed(4)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
