import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { appointmentSchema } from "@/lib/validations";
import { addMinutes, parseISO } from "date-fns";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const barberId = searchParams.get("barberId");

  try {
    const appointments = await prisma.appointment.findMany({
      where: barberId ? { barberId } : {},
      include: {
        client: true,
        service: true,
        barber: true
      },
      orderBy: { startTime: 'asc' }
    });
    return NextResponse.json(appointments);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = appointmentSchema.parse(body);

    const service = await prisma.service.findUnique({
      where: { id: validatedData.serviceId }
    });

    if (!service) {
      return NextResponse.json({ error: "Serviço não encontrado" }, { status: 404 });
    }

    const startTime = parseISO(validatedData.startTime);
    const endTime = addMinutes(startTime, service.duration);

    // Check for collisions (PR-03 / Technical requirement)
    const collision = await prisma.appointment.findFirst({
      where: {
        barberId: validatedData.barberId,
        status: { not: 'CANCELLED' },
        OR: [
          {
            startTime: { lt: endTime },
            endTime: { gt: startTime }
          }
        ]
      }
    });

    if (collision) {
      return NextResponse.json({ error: "Este horário já está ocupado" }, { status: 409 });
    }

    // Tenant check (mocked for demo)
    const tenantId = "sentobar-tenant-id";

    const appointment = await prisma.appointment.create({
      data: {
        ...validatedData,
        tenantId,
        startTime,
        endTime,
      }
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 });
  }
}
