import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const sport = searchParams.get('sport');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    if (id) {
      const article = await db.news.findUnique({ where: { id } });
      if (!article) {
        return NextResponse.json({ error: 'Notícia não encontrada' }, { status: 404 });
      }
      return NextResponse.json(article);
    }

    const where: Record<string, unknown> = {};

    if (sport && sport !== 'general') {
      where.sport = sport;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const articles = await db.news.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit ? parseInt(limit, 10) : undefined,
    });

    return NextResponse.json(articles);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, category, sport, featured } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Título e descrição são obrigatórios' }, { status: 400 });
    }

    const news = await db.news.create({
      data: {
        title,
        description,
        image: image || '',
        category: category || 'Geral',
        sport: sport || 'general',
        featured: !!featured,
      },
    });

    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, description, image, category, sport, featured } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID da notícia é obrigatório' }, { status: 400 });
    }

    const news = await db.news.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(image !== undefined && { image }),
        ...(category && { category }),
        ...(sport && { sport }),
        ...(featured !== undefined && { featured: !!featured }),
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID da notícia é obrigatório' }, { status: 400 });
    }

    await db.news.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
