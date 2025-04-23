'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link 
                href="/" 
                className="flex items-center py-5 px-2 text-white font-bold"
              >
                <span>Geribildirim Uygulaması</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link 
                href="/" 
                className={`py-5 px-3 hover:text-blue-200 ${
                  isActive('/') ? 'text-white border-b-2 border-white' : ''
                }`}
              >
                Ana Sayfa
              </Link>
              <Link 
                href="/feedback/new" 
                className={`py-5 px-3 hover:text-blue-200 ${
                  isActive('/feedback/new') ? 'text-white border-b-2 border-white' : ''
                }`}
              >
                Yeni Geribildirim
              </Link>
              <Link 
                href="/admin" 
                className={`py-5 px-3 hover:text-blue-200 ${
                  isActive('/admin') ? 'text-white border-b-2 border-white' : ''
                }`}
              >
                Yönetim Paneli
              </Link>
            </div>
          </div>
          
          {/* Mobil menü butonu */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg 
                className="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobil menü */}
      <div className="mobile-menu hidden md:hidden">
        <Link 
          href="/" 
          className={`block py-2 px-4 text-sm hover:bg-blue-700 ${
            isActive('/') ? 'bg-blue-700' : ''
          }`}
        >
          Ana Sayfa
        </Link>
        <Link 
          href="/feedback/new" 
          className={`block py-2 px-4 text-sm hover:bg-blue-700 ${
            isActive('/feedback/new') ? 'bg-blue-700' : ''
          }`}
        >
          Yeni Geribildirim
        </Link>
        <Link 
          href="/admin" 
          className={`block py-2 px-4 text-sm hover:bg-blue-700 ${
            isActive('/admin') ? 'bg-blue-700' : ''
          }`}
        >
          Yönetim Paneli
        </Link>
      </div>
    </nav>
  );
} 