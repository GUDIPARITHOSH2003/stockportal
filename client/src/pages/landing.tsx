import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BarChart3, DollarSign, Newspaper } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">FinanceHub</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your comprehensive financial portal for market data, stocks, currencies, and news
            </p>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/api/login'}
              className="bg-primary hover:bg-blue-700"
            >
              Sign In to Get Started
            </Button>
          </div>
        </header>

        {/* Features */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Real-time Market Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Track market indices, stocks, and financial instruments with live updates every 4 seconds.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Stock Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Comprehensive stock information with detailed metrics, charts, and favorites management.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Currency Exchange</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Live currency rates with configurable margins and built-in currency calculator.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Financial News</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stay updated with the latest financial news from trusted sources and market insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8">
              <h2 className="text-2xl font-semibold mb-4">Ready to Start Trading?</h2>
              <p className="text-gray-600 mb-6">
                Join thousands of traders who rely on FinanceHub for their market analysis and trading decisions.
              </p>
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/api/login'}
                className="bg-primary hover:bg-blue-700"
              >
                Access Your Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
