import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    
    const feedback = await prisma.feedback.findUnique({
      where: { id },
    });
    
    if (!feedback) {
      return NextResponse.json(
        { error: 'Geribildirim bulunamadı' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(feedback);
  } catch (error) {
    console.error('Feedback getirme hatası:', error);
    return NextResponse.json(
      { error: 'Geribildirim bilgisi alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Önce feedback'in var olup olmadığını kontrol et
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id },
    });
    
    if (!existingFeedback) {
      return NextResponse.json(
        { error: 'Geribildirim bulunamadı' },
        { status: 404 }
      );
    }
    
    // Güncelleme işlemi
    const updatedFeedback = await prisma.feedback.update({
      where: { id },
      data: body,
    });
    
    return NextResponse.json(updatedFeedback);
  } catch (error) {
    console.error('Feedback güncelleme hatası:', error);
    return NextResponse.json(
      { error: 'Geribildirim güncellenirken bir hata oluştu' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    
    // Önce feedback'in var olup olmadığını kontrol et
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id },
    });
    
    if (!existingFeedback) {
      return NextResponse.json(
        { error: 'Geribildirim bulunamadı' },
        { status: 404 }
      );
    }
    
    // Silme işlemi
    await prisma.feedback.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Geribildirim başarıyla silindi' });
  } catch (error) {
    console.error('Feedback silme hatası:', error);
    return NextResponse.json(
      { error: 'Geribildirim silinirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 