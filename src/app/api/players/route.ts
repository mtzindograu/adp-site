import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');
    const team = searchParams.get('team');

    const where: Record<string, unknown> = {};

    if (sport) {
      where.sport = sport;
    }

    if (team) {
      where.team = team;
    }

    const players = await db.player.findMany({
      where,
      orderBy: { number: 'asc' },
    });

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    return NextResponse.json({ error: 'Failed to fetch players' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, position, number, photo, sport, team } = body;

    if (!name || !position || number === undefined || !sport) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const player = await db.player.create({
      data: {
        name,
        position,
        number: parseInt(number),
        photo: photo || '',
        sport,
        team: team || 'professional',
      },
    });

    return NextResponse.json(player, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json({ error: 'Failed to create player' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, position, number, photo, sport, team, goals, assists, matches } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing player id' }, { status: 400 });
    }

    const player = await db.player.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(position && { position }),
        ...(number !== undefined && { number: parseInt(number) }),
        ...(photo !== undefined && { photo }),
        ...(sport && { sport }),
        ...(team && { team }),
        ...(goals !== undefined && { goals: parseInt(goals) }),
        ...(assists !== undefined && { assists: parseInt(assists) }),
        ...(matches !== undefined && { matches: parseInt(matches) }),
      },
    });

    return NextResponse.json(player);
  } catch (error) {
    console.error('Error updating player:', error);
    return NextResponse.json({ error: 'Failed to update player' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing player id' }, { status: 400 });
    }

    await db.player.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting player:', error);
    return NextResponse.json({ error: 'Failed to delete player' }, { status: 500 });
  }
}
