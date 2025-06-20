import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown } from "lucide-react";

export default function CurrencyExchange() {
  const [fromAmount, setFromAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");

  const { data: currencyPairs } = useQuery({
    queryKey: ['/api/currencies'],
  });

  const calculateExchange = () => {
    if (!currencyPairs || !fromAmount) return "0.00";
    
    const amount = parseFloat(fromAmount);
    if (isNaN(amount)) return "0.00";

    // Find the appropriate currency pair
    const pairSymbol = `${fromCurrency}/${toCurrency}`;
    const reversePairSymbol = `${toCurrency}/${fromCurrency}`;
    
    let rate = 1;
    const pair = currencyPairs.find((p: any) => p.symbol === pairSymbol);
    const reversePair = currencyPairs.find((p: any) => p.symbol === reversePairSymbol);
    
    if (pair) {
      rate = parseFloat(pair.rate) * (1 + parseFloat(pair.margin) / 100);
    } else if (reversePair) {
      rate = 1 / (parseFloat(reversePair.rate) * (1 + parseFloat(reversePair.margin) / 100));
    }
    
    return (amount * rate).toFixed(2);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Currency Exchange</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Currency Pairs Display */}
          <div className="space-y-3">
            {currencyPairs?.slice(0, 4).map((pair: any) => {
              const isPositive = parseFloat(pair.changePercent) >= 0;
              return (
                <div
                  key={pair.symbol}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{pair.base}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pair.symbol}</p>
                      <p className="text-xs text-gray-500">{pair.base} to {pair.quote}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">
                      {parseFloat(pair.rate).toFixed(4)}
                    </p>
                    <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '+' : ''}{pair.changePercent}%
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Currency Calculator */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Currency Calculator</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="number"
                  placeholder="Amount"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                />
                <Select value={fromCurrency} onValueChange={setFromCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-center">
                <ArrowDown className="h-5 w-5 text-gray-400 mx-auto" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">
                    {calculateExchange()} {toCurrency}
                  </div>
                </div>
                <Select value={toCurrency} onValueChange={setToCurrency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="JPY">JPY</SelectItem>
                    <SelectItem value="AUD">AUD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-xs text-gray-500 text-center mt-2">
                * Includes bank margin
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
