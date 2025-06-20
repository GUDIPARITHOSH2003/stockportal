import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Settings, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [marginUpdates, setMarginUpdates] = useState<Record<string, number>>({});

  const { data: users } = useQuery({
    queryKey: ['/api/admin/users'],
  });

  const { data: currencies } = useQuery({
    queryKey: ['/api/currencies'],
  });

  const updateMarginMutation = useMutation({
    mutationFn: async (data: { symbol: string; margin: number }) => {
      await apiRequest('PUT', `/api/currencies/${data.symbol}/margin`, { margin: data.margin });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/currencies'] });
      toast({
        title: "Success",
        description: "Currency margin updated successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update currency margin",
        variant: "destructive",
      });
    },
  });

  const handleMarginChange = (symbol: string, margin: number) => {
    setMarginUpdates(prev => ({ ...prev, [symbol]: margin }));
  };

  const saveMargin = (symbol: string) => {
    const margin = marginUpdates[symbol];
    if (margin !== undefined) {
      updateMarginMutation.mutate({ symbol, margin });
      setMarginUpdates(prev => {
        const { [symbol]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Admin Panel</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Button size="sm" className="bg-primary hover:bg-blue-700">
                  Add New User
                </Button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {users?.map((user: any) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {user.role}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Currency Margin Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Currency Margins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {currencies?.map((currency: any) => (
                  <div key={currency.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                    <div>
                      <p className="text-sm font-medium">{currency.symbol}</p>
                      <p className="text-xs text-gray-600">{currency.base} to {currency.quote}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={marginUpdates[currency.symbol] !== undefined 
                          ? marginUpdates[currency.symbol] 
                          : parseFloat(currency.margin)
                        }
                        onChange={(e) => handleMarginChange(currency.symbol, parseFloat(e.target.value))}
                        className="w-16 text-center"
                      />
                      <span className="text-sm text-gray-600">%</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => saveMargin(currency.symbol)}
                        disabled={
                          marginUpdates[currency.symbol] === undefined || 
                          updateMarginMutation.isPending
                        }
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800 flex items-center">
                  <Settings className="h-4 w-4 mr-1" />
                  Special customer rates can override these default margins through customer profile settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
