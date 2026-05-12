import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sport = searchParams.get('sport');
    const status = searchParams.get('status');
    const team = searchParams.get('team');

    const where: Record<string, unknown> = {};

    if (sport) {
      where.sport = sport;
    }

    if (status) {
      where.status = status;
    }

    if (team) {
      where.team = team;
    }

    const matches = await db.match.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { opponent, date, time, competition, venue, sport, team } = body;

    if (!opponent || !date || !sport) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const match = await db.match.create({
      data: {
        opponent,
        date: new Date(date),
        time: time || '16:00',
        competition: competition || '',
        venue: venue || 'Casa',
        sport,
        team: team || 'professional',
      },
    });

    return NextResponse.json(match, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, opponent, date, time, competition, venue, sport, team, homeScore, awayScore, status } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing match id' }, { status: 400 });
    }

    const match = await db.match.update({
      where: { id },
      data: {
        ...(opponent && { opponent }),
        ...(date && { date: new Date(date) }),
        ...(time !== undefined && { time }),
        ...(competition !== undefined && { competition }),
        ...(venue !== undefined && { venue }),
        ...(sport && { sport }),
        ...(team && { team }),
        ...(homeScore !== undefined && { homeScore: homeScore !== null ? parseInt(homeScore) : null }),
        ...(awayScore !== undefined && { awayScore: awayScore !== null ? parseInt(awayScore) : null }),
        ...(status && { status }),
      },
    });

    return NextResponse.json(match);
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json({ error: 'Failed to update match' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing match id' }, { status: 400 });
    }

    await db.match.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting match:', error);
    return NextResponse.json({ error: 'Failed to delete match' }, { status: 500 });
  }
}
