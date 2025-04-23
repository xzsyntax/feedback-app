import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, rating } = body;

    // Validasyon
    if (!name || !email || !message || !rating) {
      return NextResponse.json(
        { error: 'Tüm alanları doldurmak zorunludur' },
        { status: 400 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Geçerli bir email adresi giriniz' },
        { status: 400 }
      );
    }

    // Rating aralık kontrolü
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Değerlendirme 1 ile 5 arasında olmalıdır' },
        { status: 400 }
      );
    }

    // Veritabanına kaydet
    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        message,
        rating,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error('Feedback oluşturma hatası:', error);
    return NextResponse.json(
      { error: 'Geribildirim gönderilirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error('Feedback getirme hatası:', error);
    return NextResponse.json(
      { error: 'Geribildirimleri getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 