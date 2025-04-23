'use client';

import { useState, useEffect } from 'react';
import FeedbackCard from './FeedbackCard';

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
  status: string;
}

interface FeedbackListProps {
  isAdmin?: boolean;
}

export default function FeedbackList({ isAdmin = false }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/feedback');
        
        if (!response.ok) {
          throw new Error('Geribildirimleri getirirken bir hata oluştu');
        }
        
        const data = await response.json();
        setFeedbacks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchFeedbacks();
  }, []);
  
  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'all') return true;
    return feedback.status === filter;
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }
  
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Henüz geribildirim yok.</p>
      </div>
    );
  }
  
  return (
    <div>
      {isAdmin && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Filtreleme</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded ${
                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded ${
                filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Beklemede
            </button>
            <button
              onClick={() => setFilter('reviewed')}
              className={`px-3 py-1 rounded ${
                filter === 'reviewed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              İncelendi
            </button>
            <button
              onClick={() => setFilter('responded')}
              className={`px-3 py-1 rounded ${
                filter === 'responded' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Yanıtlandı
            </button>
          </div>
        </div>
      )}
      
      <div>
        {filteredFeedbacks.map((feedback) => (
          <FeedbackCard key={feedback.id} feedback={feedback} isAdmin={isAdmin} />
        ))}
      </div>
    </div>
  );
} 