'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
  status: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
  isAdmin?: boolean;
}

export default function FeedbackCard({ feedback, isAdmin = false }: FeedbackCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState(feedback.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = async () => {
    if (window.confirm('Bu geribildirim silinecek. Emin misiniz?')) {
      setIsDeleting(true);
      try {
        const response = await fetch(`/api/feedback/${feedback.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Geribildirim silinirken hata oluştu.');
        }

        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
        setIsDeleting(false);
      }
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/feedback/${feedback.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Durum güncellenirken hata oluştu.');
      }

      setStatus(newStatus);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Beklemede';
      case 'reviewed':
        return 'İncelendi';
      case 'responded':
        return 'Yanıtlandı';
      default:
        return status;
    }
  };

  // Yıldız gösterimi
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < rating ? 'text-yellow-500' : 'text-gray-300'}>
        ★
      </span>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 relative">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{feedback.name}</h3>
        <div className="flex space-x-1">{renderStars(feedback.rating)}</div>
      </div>
      
      <p className="text-sm text-gray-500 mb-1">{feedback.email}</p>
      <p className="text-sm text-gray-500 mb-4">
        {formatDate(feedback.createdAt)}
      </p>
      
      <div className="mb-4">
        <p className="text-gray-700">{feedback.message}</p>
      </div>
      
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(status)}`}>
          {getStatusText(status)}
        </span>
        
        {isAdmin && (
          <div className="flex space-x-2">
            {status !== 'reviewed' && (
              <button
                onClick={() => handleStatusChange('reviewed')}
                disabled={isUpdating}
                className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition"
              >
                İncelendi
              </button>
            )}
            
            {status !== 'responded' && (
              <button
                onClick={() => handleStatusChange('responded')}
                disabled={isUpdating}
                className="text-sm bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition"
              >
                Yanıtlandı
              </button>
            )}
            
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-sm bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
            >
              {isDeleting ? 'Siliniyor...' : 'Sil'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 