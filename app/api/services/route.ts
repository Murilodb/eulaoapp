import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    // In a real app, filter by tenantId from session
    const services = await prisma.service.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar serviços" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = serviceSchema.parse(body);

    // Hardcoded tenantId for demo, in production get from session
    const tenantId = "gendei-tenant-id"; 

    const service = await prisma.service.create({
      data: {
        ...validatedData,
        tenantId,
      }
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao criar serviço" }, { status: 500 });
  }
}
