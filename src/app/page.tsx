import FeedbackList from '@/components/FeedbackList';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Geribildirim Platformu</h1>
          
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            Ürün ve hizmetlerimiz hakkında düşüncelerinizi öğrenmek istiyoruz. Geri bildirimleriniz bizim için çok değerli ve hizmetlerimizi geliştirmemize yardımcı oluyor.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/feedback/new" 
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Yeni Geribildirim Gönder
            </Link>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Son Geribildirimleri Görüntüle</h2>
          <FeedbackList />
        </div>
      </main>
      
      <footer className="bg-gray-800 text-white py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Geribildirim Uygulaması</p>
        </div>
      </footer>
    </div>
  );
}
