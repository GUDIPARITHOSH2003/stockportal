import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, X, TrendingUp, TrendingDown } from "lucide-react";

interface StockDetailModalProps {
  stock: any;
  onClose: () => void;
}

export default function StockDetailModal({ stock, onClose }: StockDetailModalProps) {
  if (!stock) return null;

  const isPositive = parseFloat(stock.changePercent) >= 0;

  return (
    <Dialog open={!!stock} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {stock.company} ({stock.symbol})
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge variant={isPositive ? "default" : "destructive"}>
                {isPositive ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {isPositive ? '+' : ''}{stock.changePercent}%
              </Badge>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Current Price:</span>
                <span className="font-medium">${parseFloat(stock.price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day Change:</span>
                <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}${stock.change} ({isPositive ? '+' : ''}{stock.changePercent}%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Day Volume:</span>
                <span className="font-medium">{stock.volume}</span>
              </div>
              {stock.marketCap && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Market Cap:</span>
                  <span className="font-medium">{stock.marketCap}</span>
                </div>
              )}
              {stock.peRatio && (
                <div className="flex justify-between">
                  <span className="text-gray-600">P/E Ratio:</span>
                  <span className="font-medium">{stock.peRatio}</span>
                </div>
              )}
              {stock.high52 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">52 Week High:</span>
                  <span className="font-medium">${parseFloat(stock.high52).toFixed(2)}</span>
                </div>
              )}
              {stock.low52 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">52 Week Low:</span>
                  <span className="font-medium">${parseFloat(stock.low52).toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Price Chart</h3>
            <div className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive Price Chart</p>
                <p className="text-sm text-gray-500">Real-time data visualization</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="outline" className="flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Add to Favorites
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
