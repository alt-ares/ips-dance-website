import { NextRequest, NextResponse } from 'next/server';
import { PerformanceDate } from '@/types';
import fs from 'fs';
import path from 'path';

const DATES_FILE = path.join(process.cwd(), 'lib/data/dates.json');

/**
 * GET /api/dates/[id] - Récupère une date par ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const fileContent = fs.readFileSync(DATES_FILE, 'utf-8');
    const dates = JSON.parse(fileContent) as PerformanceDate[];
    
    const date = dates.find((d) => d.id === params.id);
    
    if (!date) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 });
    }
    
    return NextResponse.json(date);
  } catch (error) {
    console.error('Error reading date:', error);
    return NextResponse.json({ error: 'Failed to load date' }, { status: 500 });
  }
}

/**
 * PUT /api/dates/[id] - Met à jour une date
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // Lire les dates existantes
    const fileContent = fs.readFileSync(DATES_FILE, 'utf-8');
    const dates = JSON.parse(fileContent) as PerformanceDate[];
    
    const dateIndex = dates.findIndex((d) => d.id === params.id);
    
    if (dateIndex === -1) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 });
    }
    
    // Mettre à jour la date
    const updatedDate: PerformanceDate = {
      ...dates[dateIndex],
      date: body.date || dates[dateIndex].date,
      fullDate: body.fullDate || dates[dateIndex].fullDate,
      city: body.city || dates[dateIndex].city,
      venue: body.venue || dates[dateIndex].venue,
      show: body.show || dates[dateIndex].show,
      ticketsUrl: body.ticketsUrl,
      updatedAt: new Date().toISOString(),
    };
    
    dates[dateIndex] = updatedDate;
    
    // Écrire dans le fichier
    fs.writeFileSync(DATES_FILE, JSON.stringify(dates, null, 2), 'utf-8');
    
    return NextResponse.json(updatedDate);
  } catch (error) {
    console.error('Error updating date:', error);
    return NextResponse.json({ error: 'Failed to update date' }, { status: 500 });
  }
}

/**
 * DELETE /api/dates/[id] - Supprime une date
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Lire les dates existantes
    const fileContent = fs.readFileSync(DATES_FILE, 'utf-8');
    const dates = JSON.parse(fileContent) as PerformanceDate[];
    
    const dateIndex = dates.findIndex((d) => d.id === params.id);
    
    if (dateIndex === -1) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 });
    }
    
    // Supprimer la date
    dates.splice(dateIndex, 1);
    
    // Écrire dans le fichier
    fs.writeFileSync(DATES_FILE, JSON.stringify(dates, null, 2), 'utf-8');
    
    return NextResponse.json({ message: 'Date deleted successfully' });
  } catch (error) {
    console.error('Error deleting date:', error);
    return NextResponse.json({ error: 'Failed to delete date' }, { status: 500 });
  }
}

