import FeedbackList from '@/components/FeedbackList';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">Yönetim Paneli</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-2">İstatistikler</h3>
              <p className="text-blue-600">Toplam Geribildirimler</p>
              <p className="text-2xl font-bold text-blue-800">-</p>
            </div>
            
            <div className="bg-green-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-800 mb-2">Yanıtlanan</h3>
              <p className="text-green-600">Toplam İşlenenler</p>
              <p className="text-2xl font-bold text-green-800">-</p>
            </div>
            
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">Bekleyen</h3>
              <p className="text-yellow-600">Bekleyen Geribildirimler</p>
              <p className="text-2xl font-bold text-yellow-800">-</p>
            </div>
          </div>
          
          <p className="mb-4 text-gray-600">
            Bu sayfadan tüm geribildirimleri yönetebilir, durumlarını güncelleyebilir ve silebilirsiniz.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-6">Tüm Geribildirimler</h2>
          <FeedbackList isAdmin={true} />
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