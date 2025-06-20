import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export default function MarketOverview() {
  const { data: indices, isLoading } = useQuery({
    queryKey: ['/api/market/indices'],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {indices?.map((index: any) => {
        const isPositive = parseFloat(index.changePercent) >= 0;
        const IconComponent = index.symbol === 'VIX' ? BarChart3 : (isPositive ? TrendingUp : TrendingDown);
        const colorClass = index.symbol === 'VIX' ? 'text-yellow-600' : (isPositive ? 'text-green-600' : 'text-red-600');
        const bgColorClass = index.symbol === 'VIX' ? 'bg-yellow-50' : (isPositive ? 'bg-green-50' : 'bg-red-50');
        
        return (
          <Card key={index.symbol} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{index.name}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {parseFloat(index.value).toLocaleString()}
                  </p>
                  <p className={`text-sm flex items-center mt-1 ${colorClass}`}>
                    <IconComponent className="h-3 w-3 mr-1" />
                    {isPositive ? '+' : ''}{index.changePercent}% ({isPositive ? '+' : ''}{index.change})
                  </p>
                </div>
                <div className={`w-12 h-12 ${bgColorClass} rounded-full flex items-center justify-center`}>
                  <IconComponent className={`h-6 w-6 ${colorClass}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
