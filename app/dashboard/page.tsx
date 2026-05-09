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
  CalendarCheck,
  Calendar,
  MoreVertical,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { motion } from "motion/react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar active="Painel" />
      
      <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
        <Header title="Visão Geral" description="Hoje é Quinta-feira, 24 de Outubro, 2023" />

        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="md:col-span-2 p-8 flex flex-col justify-between shadow-premium bg-surface-container-lowest">
              <div>
                <p className="text-[10px] font-bold text-outline uppercase tracking-[0.15em] mb-1">Receita Total Hoje</p>
                <h3 className="text-5xl font-bold text-primary tracking-tighter">R$ 1.240,00</h3>
              </div>
              <div className="flex items-center gap-2 text-secondary font-bold text-xs mt-6">
                <TrendingUp className="w-4 h-4" />
                <span>12% em relação a ontem</span>
              </div>
            </Card>

            <Card className="p-8 shadow-premium bg-surface-container-lowest">
              <div className="w-12 h-12 rounded-xl bg-secondary-container/10 flex items-center justify-center mb-4 border border-secondary/10">
                <CalendarCheck className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Total de Clientes</p>
              <h3 className="text-3xl font-bold text-primary italic tracking-tight">24</h3>
              <p className="text-[11px] text-outline mt-2 font-medium">8 Novos clientes hoje</p>
            </Card>

            <Card className="p-8 shadow-premium bg-surface-container-lowest">
              <div className="w-12 h-12 rounded-xl bg-primary-container/5 flex items-center justify-center mb-4 border border-primary/10">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <p className="text-[10px] font-bold text-outline uppercase tracking-wider mb-1">Agendamentos</p>
              <h3 className="text-3xl font-bold text-primary italic tracking-tight">18 / 22</h3>
              <p className="text-[11px] text-outline mt-2 font-medium">4 Horários restantes</p>
            </Card>
          </section>

          {/* Main Content Areas */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 overflow-hidden flex flex-col shadow-premium border-none">
              <CardHeader className="flex flex-row items-center justify-between border-b border-outline-variant/10 p-6 bg-surface-container-lowest/50">
                <CardTitle className="text-xl font-bold text-primary tracking-tight">Próximos Agendamentos</CardTitle>
                <Button variant="link" className="text-secondary text-xs uppercase tracking-widest font-bold">Ver Todos</Button>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Cliente</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Serviço</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Horário</th>
                      <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { name: "Julian Draxler", status: "Membro Gold", service: "Corte Executivo", time: "14:30", color: "bg-secondary-fixed" },
                      { name: "Aaron Ramsey", status: "Primeira Visita", service: "Barba Sculpt", time: "15:15", color: "bg-surface-variant" },
                      { name: "Thomas Lemar", status: "Recorrente", service: "Degradê Classic", time: "16:00", color: "bg-secondary-fixed" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-surface-container-low transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full ${row.color} flex items-center justify-center font-bold text-xs ring-4 ring-offset-2 ring-transparent group-hover:ring-secondary/20 transition-all`}>
                               {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary">{row.name}</p>
                              <p className="text-[10px] text-outline font-medium tracking-wide">{row.status}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-surface-container rounded-md text-[10px] font-bold text-primary border border-outline-variant/20 uppercase tracking-widest">
                            {row.service}
                          </span>
                        </td>
                        <td className="px-8 py-6 font-mono text-xs font-bold text-primary">{row.time}</td>
                        <td className="px-8 py-6 text-right opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end gap-3 translate-x-4 group-hover:translate-x-0">
                          <Button size="sm" variant="noir" className="h-9 px-6 text-[10px] uppercase tracking-widest font-bold shadow-premium">Aceitar</Button>
                          <Button size="icon" variant="outline" className="h-9 w-9 hover:bg-error hover:text-white hover:border-error transition-all rounded-lg">
                            <X className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <aside className="space-y-6">
              <Card className="p-8 shadow-premium border-none">
                <CardTitle className="text-xl font-bold text-primary mb-8 tracking-tight">Equipe de Plantão</CardTitle>
                <div className="space-y-6">
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-secondary shadow-luxury">
                        <Image src="https://picsum.photos/seed/barber1/200/200" alt="Equipe" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">Marcus (Você)</p>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">Ativo Agora</p>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse shadow-[0_0_12px_var(--color-secondary)]" />
                  </div>

                  <div className="flex items-center justify-between opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full overflow-hidden border border-outline-variant relative">
                        <Image src="https://picsum.photos/seed/barber2/200/200" alt="Equipe" fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">David S.</p>
                        <p className="text-[10px] text-outline font-bold uppercase tracking-widest mt-1">Em Intervalo</p>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 bg-outline rounded-full" />
                  </div>
                </div>
              </Card>

              <Card className="relative overflow-hidden h-64 flex items-end p-10 group cursor-pointer border-none shadow-luxury rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <Image 
                  src="https://picsum.photos/seed/tools-luxury/1000/1000" 
                  alt="Luxury Grooming" 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-20 space-y-3">
                  <div className="h-1 w-10 bg-secondary" />
                  <p className="text-[10px] font-bold text-secondary-fixed uppercase tracking-[0.4em]">Novo Serviço</p>
                  <h4 className="text-2xl font-bold text-white tracking-tight leading-tight uppercase font-mono">Terapia de Carvão Premium</h4>
                  <p className="text-xs text-outline-variant font-medium tracking-wide">Disponível para agendamento.</p>
                </div>
              </Card>
            </aside>
          </section>
        </div>
      </main>
    </div>
  );
}
