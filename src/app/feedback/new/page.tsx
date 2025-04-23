import FeedbackForm from '@/components/FeedbackForm';
import Navbar from '@/components/Navbar';

export default function NewFeedbackPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Yeni Geribildirim Gönder</h1>
        
        <FeedbackForm />
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Geribildirim Uygulaması</p>
        </div>
      </footer>
    </div>
  );
} 