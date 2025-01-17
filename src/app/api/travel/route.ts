import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db'; 

export async function POST(request: Request) {
  const { origin, destination, time, date } = await request.json();

  console.log('Dados recebidos na API:', { origin, destination, time, date });

  try {
    const newTrip = await prisma.travel.create({
      data: {
        origin,
        destination,
        time,
        date: new Date(date),
      },
    });

    console.log('Nova viagem salva:', newTrip);

    return NextResponse.json(newTrip, { status: 201 });
  } catch (error) {
    console.error('Erro ao salvar a viagem:', error);
    return NextResponse.json({ error: 'Erro ao salvar viagem no banco de dados' }, { status: 500 });
  }
}

