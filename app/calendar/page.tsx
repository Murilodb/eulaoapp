"use client";

import * as React from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Bell, 
  Moon,
  TrendingUp,
  PlusCircle,
  MoreVertical,
  Calendar,
  Clock,
  User,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layout/sidebar"; // I'll create this to reuse
import { Header } from "@/components/layout/header";   // I'll create this to reuse
import { motion } from "motion/react";
import Image from "next/image";

export default function CalendarPage() {
  const days = [
    { name: "Seg 23", date: 23 },
    { name: "Ter 24", date: 24 },
    { name: "Qua 25", date: 25, active: true },
    { name: "Qui 26", date: 26 },
    { name: "Sex 27", date: 27 },
    { name: "Sáb 28", date: 28 },
  ];

  const hours = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

  const appointments = [
    { day: 23, hour: "09:00", client: "Marcus J.", service: "Barba", type: "confirmed" },
    { day: 25, hour: "09:00", client: "Julian R.", service: "Degradê", type: "pending" },
    { day: 24, hour: "10:00", client: "Sarah L.", service: "Social", type: "confirmed" },
    { day: 27, hour: "10:00", client: "Elias K.", service: "Luzes", type: "confirmed" },
    { day: 25, hour: "11:00", client: "Lista de Espera", service: "A definir", type: "pending" },
    { day: 26, hour: "11:00", client: "Derrick H.", service: "Acabamento", type: "confirmed" },
    { day: 23, hour: "13:00", client: "Kevin M.", service: "Degradê", type: "confirmed" },
    { day: 27, hour: "13:00", client: "Leo G.", service: "Barboterapia", type: "confirmed" },
    { day: 24, hour: "14:00", client: "Oliver W.", service: "Corte Clássico", type: "confirmed" },
    { day: 25, hour: "14:00", client: "Mason P.", service: "Degradê", type: "confirmed" },
  ];

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar active="Agenda" />
      
      <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
        <Header title="Agenda de Agendamentos" description="Gerencie o cronograma de sua barbearia com precisão." />

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-end mb-8">
            <div className="flex gap-4">
              <div className="flex bg-surface-container rounded-lg p-1 border border-outline-variant/10 shadow-sm">
                <Button variant="ghost" size="sm" className="bg-surface shadow-sm font-bold text-primary">Semana</Button>
                <Button variant="ghost" size="sm" className="text-outline hover:text-primary">Mês</Button>
                <Button variant="ghost" size="sm" className="text-outline hover:text-primary">Dia</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main Calendar Grid */}
            <Card className="col-span-9 overflow-hidden">
              <div className="p-1 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest/50">
                <div className="flex items-center gap-6">
                  <h3 className="text-xl font-bold text-primary">Outubro 2023</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="w-4 h-4" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Confirmado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Pendente</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/10">
                      <th className="p-4 w-24"></th>
                      {days.map((day) => (
                        <th key={day.date} className="p-4">
                          <div className={`px-4 py-2 rounded-lg text-center ${day.active ? "bg-secondary-container/20 text-secondary" : "text-outline"}`}>
                            <p className="text-[10px] font-bold uppercase tracking-widest leading-none">{day.name.split(' ')[0]}</p>
                            <p className="text-lg font-bold mt-1 leading-none">{day.date}</p>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {hours.map((hour) => (
                      <tr key={hour} className={hour === "12:00" ? "bg-surface-container-low/30" : ""}>
                        <td className="p-6 text-center text-xs font-bold text-outline border-r border-outline-variant/5">{hour}</td>
                        {hour === "12:00" ? (
                          <td colSpan={6} className="p-0">
                            <div className="flex items-center justify-center h-full w-full py-4 text-xs font-bold text-outline/40 uppercase tracking-[0.3em] font-mono italic">
                              Intervalo / Manutenção
                            </div>
                          </td>
                        ) : (
                          days.map((day) => {
                            const appt = appointments.find(a => a.day === day.date && a.hour === hour);
                            return (
                              <td key={`${day.date}-${hour}`} className="p-2 relative border-r border-outline-variant/5 min-h-[80px]">
                                {appt && (
                                  <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`p-3 rounded-lg border-l-4 shadow-sm transition-all hover:shadow-premium cursor-pointer ${
                                      appt.type === "confirmed" 
                                      ? "bg-secondary-container/10 border-secondary text-secondary" 
                                      : "bg-surface-container border-primary/20 text-primary"
                                    }`}
                                  >
                                    <p className="text-[10px] font-bold leading-tight truncate">{appt.client}</p>
                                    <p className="text-[9px] font-medium opacity-80 mt-1 uppercase tracking-wider">{appt.service}</p>
                                  </motion.div>
                                )}
                              </td>
                            );
                          })
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Quick Booking Sidebar */}
            <aside className="col-span-3 space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-8">
                  <PlusCircle className="text-secondary w-6 h-6" />
                  <CardTitle className="text-lg font-bold">Agendamento Rápido</CardTitle>
                </div>
                
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Nome do Cliente</label>
                    <Input placeholder="ex. João Silva" className="h-10 bg-surface border-outline-variant/20" />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Tipo de Serviço</label>
                     <select className="flex h-10 w-full rounded-md border border-outline-variant/30 bg-surface px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:cursor-not-allowed disabled:opacity-50">
                        <option>Corte Clássico</option>
                        <option>Barba Esculpida</option>
                        <option>Degradê Signature</option>
                        <option>Barba com Toalha Quente</option>
                        <option>Tratamento Executivo</option>
                     </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Data</label>
                      <Input type="date" className="h-10 text-xs bg-surface border-outline-variant/20" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Hora</label>
                      <Input type="time" className="h-10 text-xs bg-surface border-outline-variant/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-wider">Barbeiro Designado</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Ricardo", "Jorge", "Bruno"].map((name) => (
                        <button 
                          key={name}
                          type="button" 
                          className={`py-2 rounded-lg border text-[10px] font-bold transition-all ${
                            name === "Jorge" 
                            ? "bg-secondary-container/10 border-secondary text-secondary" 
                            : "border-outline-variant/20 text-outline hover:border-outline"
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button variant="premium" className="w-full h-12 shadow-luxury font-bold text-sm tracking-wide mt-4">
                    Criar Agendamento
                  </Button>
                </form>
              </Card>

              {/* Shop Analytics Mini Card */}
              <Card className="bg-primary p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <p className="text-[9px] font-bold text-outline/60 uppercase tracking-[0.2em] mb-1">Capacidade Diária</p>
                  <h4 className="text-2xl font-bold mb-4">84% Ocupado</h4>
                  <div className="h-1.5 w-full bg-white/10 rounded-full mb-6 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "84%" }}
                      className="h-full bg-secondary"
                    />
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] text-outline/60 uppercase tracking-widest underline decoration-secondary underline-offset-4">Rec. Est. Total</p>
                      <p className="text-xl font-bold text-secondary-fixed mt-2">R$ 1.420,00</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-secondary opacity-40 translate-y-2 translate-x-2" />
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />
              </Card>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
