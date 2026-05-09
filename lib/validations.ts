import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const serviceSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  description: z.string().optional(),
  price: z.number().positive("O preço deve ser positivo"),
  duration: z.number().int().positive("A duração deve ser positiva"),
});

export const appointmentSchema = z.object({
  barberId: z.string().cuid(),
  clientId: z.string().cuid(),
  serviceId: z.string().cuid(),
  startTime: z.string().datetime(),
  notes: z.string().optional(),
});

export const clientSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido").optional().or(z.literal('')),
  phone: z.string().optional(),
});
