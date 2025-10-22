import { NextRequest, NextResponse } from 'next/server';
import { PerformanceDate } from '@/types';
import fs from 'fs';
import path from 'path';

const DATES_FILE = path.join(process.cwd(), 'lib/data/dates.json');

/**
 * GET /api/dates - Récupère toutes les dates
 */
export async function GET() {
  try {
    const fileContent = fs.readFileSync(DATES_FILE, 'utf-8');
    const dates = JSON.parse(fileContent) as PerformanceDate[];
    
    // Trier par date complète (plus proche en premier, chronologique)
    const sortedDates = dates.sort((a, b) => {
      if (!a.fullDate || !b.fullDate) return 0;
      return new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime();
    });
    
    return NextResponse.json(sortedDates);
  } catch (error) {
    console.error('Error reading dates:', error);
    return NextResponse.json({ error: 'Failed to load dates' }, { status: 500 });
  }
}

/**
 * POST /api/dates - Crée une nouvelle date
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validation basique
    if (!body.date || !body.city || !body.venue || !body.show) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Lire les dates existantes
    const fileContent = fs.readFileSync(DATES_FILE, 'utf-8');
    const dates = JSON.parse(fileContent) as PerformanceDate[];
    
    // Générer un nouvel ID
    const maxId = dates.reduce((max, date) => {
      const id = parseInt(date.id);
      return id > max ? id : max;
    }, 0);
    
    const newDate: PerformanceDate = {
      id: (maxId + 1).toString(),
      date: body.date,
      fullDate: body.fullDate,
      city: body.city,
      venue: body.venue,
      show: body.show,
      ticketsUrl: body.ticketsUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Ajouter la nouvelle date
    dates.push(newDate);
    
    // Écrire dans le fichier
    fs.writeFileSync(DATES_FILE, JSON.stringify(dates, null, 2), 'utf-8');
    
    return NextResponse.json(newDate, { status: 201 });
  } catch (error) {
    console.error('Error creating date:', error);
    return NextResponse.json({ error: 'Failed to create date' }, { status: 500 });
  }
}

