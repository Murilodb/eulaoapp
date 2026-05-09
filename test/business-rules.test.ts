import { describe, it, expect, vi } from 'vitest';
import { addMinutes, parseISO, isWithinInterval } from 'date-fns';

// Simulating the collision logic from app/api/appointments/route.ts
function checkCollision(existingAppointments: any[], newStartTime: Date, durationMinutes: number) {
  const newEndTime = addMinutes(newStartTime, durationMinutes);
  
  return existingAppointments.some(appointment => {
    const existingStart = new Date(appointment.startTime);
    const existingEnd = new Date(appointment.endTime);
    
    // Check if intervals overlap
    return (newStartTime < existingEnd && newEndTime > existingStart);
  });
}

describe('Regras de Negócio - Agendamento', () => {
  const existingAppointments = [
    {
      id: '1',
      startTime: parseISO('2023-10-24T10:00:00Z').toISOString(),
      endTime: parseISO('2023-10-24T10:45:00Z').toISOString(), // 45 min duration
    }
  ];

  it('deve detectar colisão quando o horário pretendido sobrepõe um agendamento existente', () => {
    const newStart = parseISO('2023-10-24T10:30:00Z');
    const hasCollision = checkCollision(existingAppointments, newStart, 45);
    expect(hasCollision).toBe(true);
  });

  it('deve permitir agendamento quando o horário é após o término do existente', () => {
    const newStart = parseISO('2023-10-24T10:45:00Z');
    const hasCollision = checkCollision(existingAppointments, newStart, 45);
    expect(hasCollision).toBe(false);
  });

  it('deve detectar colisão quando o novo agendamento termina dentro de um existente', () => {
    const newStart = parseISO('2023-10-24T09:30:00Z');
    const hasCollision = checkCollision(existingAppointments, newStart, 45); // ends at 10:15
    expect(hasCollision).toBe(true);
  });
});

describe('Regras de Negócio - Financeiro', () => {
  it('deve formatar corretamente os preços armazenados em centavos (BRL)', () => {
    const priceInCents = 5550; // R$ 55,50
    const formatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceInCents / 100);
    // Replacing non-breaking space used by some environments in Intl
    expect(formatted.replace(/\s/g, ' ')).toContain('55,50');
  });
});
