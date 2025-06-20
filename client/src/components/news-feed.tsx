import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ExternalLink } from "lucide-react";

export default function NewsFeed() {
  const { data: news, isLoading } = useQuery({
    queryKey: ['/api/news'],
  });

  const formatTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    return `${diffInHours} hours ago`;
  };

  if (isLoading) {
    return (
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Financial News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-24 bg-gray-200 rounded-md mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Financial News</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          {news?.map((article: any) => (
            <div
              key={article.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer group"
              onClick={() => window.open('#', '_blank')}
            >
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-24 object-cover rounded-md mb-3"
                />
              )}
              <div>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary line-clamp-2 flex-1">
                    {article.title}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-gray-400 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{article.source}</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTimeAgo(article.publishedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
