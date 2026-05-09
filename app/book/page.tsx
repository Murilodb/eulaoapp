"use client";

import * as React from "react";
import Image from "next/image";
import { Scissors, Calendar, Clock, User, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Share2, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "motion/react";

export default function BookingPage() {
  const [step, setStep] = React.useState(1);
  const [selectedService, setSelectedService] = React.useState<number | null>(1);
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [selectedDay, setSelectedDay] = React.useState(4);

  const services = [
    { id: 1, name: "Degradê", price: 5000, duration: 45, description: "Degradê de precisão com acabamento premium." },
    { id: 2, name: "Americano", price: 4500, duration: 35, description: "Corte clássico estilo americano com contornos nítidos." },
    { id: 3, name: "Social", price: 4000, duration: 30, description: "Corte limpo e conservador, ideal para ambientes formais." },
    { id: 4, name: "Barba Master", price: 3500, duration: 30, description: "Modelagem completa de barba com toalha quente e finalização com óleo." },
  ];

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:30", "15:30", "17:00"];

  const formatPrice = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
  };

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-secondary/30 selection:text-primary">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20">
        <div className="max-w-7xl mx-auto px-8 h-full flex justify-between items-center text-primary">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold tracking-tighter">Gendei</h1>
            <div className="h-4 w-px bg-outline-variant/30 mx-2 hidden md:block" />
            <span className="text-[10px] font-bold text-secondary uppercase tracking-[0.3em] hidden md:block">Barbearia Premium</span>
          </div>
          <div className="flex items-center gap-8">
            <button className="text-[10px] font-bold text-outline hover:text-primary transition-colors tracking-widest">AJUDA</button>
            <Button variant="noir" className="rounded-full px-8 h-12 shadow-premium font-bold text-xs tracking-widest uppercase">
              Meus Agendamentos
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
        <section className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-primary tracking-tighter mb-4"
          >
            Reserve Sua Experiência
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-on-surface-variant max-w-2xl font-medium leading-relaxed"
          >
            Cortes de precisão, atmosfera premium. Selecione seu serviço e o horário de sua preferência abaixo para agendar com nossos barbeiros mestres.
          </motion.p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-8">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <Scissors className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-primary tracking-tight">1. Selecione o Serviço</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((s) => (
                  <Card 
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={`p-6 cursor-pointer transition-all duration-300 relative border-2 ${
                      selectedService === s.id 
                      ? "border-secondary bg-secondary-container/5 shadow-premium" 
                      : "border-outline-variant/30 hover:border-secondary/40 hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-xl font-bold text-primary tracking-tight">{s.name}</h3>
                       <span className="text-lg font-bold text-secondary">{formatPrice(s.price)}</span>
                    </div>
                    <p className="text-sm text-on-surface-variant mb-6 leading-relaxed font-medium">{s.description}</p>
                    <div className="flex items-center gap-2 text-outline font-bold text-[10px] uppercase tracking-widest">
                       <Clock className="w-3.5 h-3.5" />
                       <span>{s.duration} MIN</span>
                    </div>
                    {selectedService === s.id && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="absolute -top-2 -right-2 bg-secondary text-white rounded-full p-1 shadow-premium ring-4 ring-surface"
                      >
                        <CheckCircle2 className="w-4 h-4 fill-secondary text-white" />
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
            </section>

            <section className="space-y-8 pt-6 border-t border-outline-variant/10">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-secondary-container/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-primary tracking-tight">2. Informações Pessoais</h2>
              </div>

              <Card className="p-8 space-y-8 bg-surface-container-lowest/50 border-none shadow-premium">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                    <Input placeholder="Seu nome" className="h-14 bg-surface-container-low/50 border-none rounded-xl focus:ring-2 focus:ring-secondary/20 placeholder:text-outline/40" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] ml-1">Telefone</label>
                    <Input placeholder="+55 (00) 00000-0000" className="h-14 bg-surface-container-low/50 border-none rounded-xl focus:ring-2 focus:ring-secondary/20 placeholder:text-outline/40" />
                  </div>
                </div>
              </Card>
            </section>
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <section className="card-ambient p-8 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="text-secondary w-5 h-5" />
                <h2 className="text-xl font-bold text-primary tracking-tight">3. Data e Horário</h2>
              </div>

              <div className="mb-10 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-primary">Outubro 2023</h3>
                  <div className="flex gap-2">
                     <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container transition-colors"><ChevronLeft className="w-4 h-4" /></Button>
                     <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container transition-colors"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-outline uppercase tracking-widest mb-2 opacity-60">
                   {["D", "S", "T", "Q", "Q", "S", "S"].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-1">
                   {[24, 25, 26, 27, 1, 2, 3].map((d, i) => (
                     <div key={i} className="aspect-square flex items-center justify-center text-xs font-bold text-outline/30 cursor-not-allowed italic">
                        {d}
                     </div>
                   ))}
                   {[4, 5, 6, 7, 8, 9, 10].map((d) => (
                     <div 
                       key={d} 
                       onClick={() => setSelectedDay(d)}
                       className={`aspect-square flex items-center justify-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                         selectedDay === d ? "bg-primary text-white shadow-premium" : "hover:bg-secondary-container/10 hover:text-secondary text-primary"
                       }`}
                     >
                       {d}
                     </div>
                   ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-outline uppercase tracking-[0.2em] mb-4 block">Horários Disponíveis</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(t => (
                    <button 
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-3 border rounded-xl text-xs font-bold tracking-wide transition-all ${
                        selectedTime === t 
                        ? "bg-primary text-white border-primary shadow-premium" 
                        : "border-outline-variant/20 text-on-surface-variant hover:border-secondary/40 hover:text-secondary"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-outline-variant/10 space-y-8">
                <div className="flex justify-between items-end">
                   <div className="space-y-1">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Valor Total</p>
                      <p className="text-3xl font-bold text-primary tracking-tighter">
                        {selectedService ? formatPrice(services.find(s => s.id === selectedService)!.price) : "—"}
                      </p>
                   </div>
                   <div className="text-right space-y-1">
                      <p className="text-[10px] font-bold text-outline uppercase tracking-widest">Duração</p>
                      <p className="text-sm font-bold text-on-surface">
                        {selectedService ? services.find(s => s.id === selectedService)!.duration : 0} Minutos
                      </p>
                   </div>
                </div>

                <Button 
                  variant="premium" 
                  size="xl" 
                  className="w-full h-16 text-sm font-bold uppercase tracking-[0.2em] group flex items-center justify-center gap-3 shadow-luxury"
                  disabled={!selectedTime || !selectedService}
                >
                  Confirmar Agendamento
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
                <p className="text-[10px] text-center text-outline font-bold uppercase tracking-widest opacity-60">Pagamento não é necessário agora.</p>
              </div>
            </section>

            <Card className="p-8 bg-primary text-white border-none shadow-luxury overflow-hidden relative">
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-secondary ring-4 ring-white/5">
                  <Image src="https://picsum.photos/seed/ricardo/200/200" alt="Master Barber" fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">Ricardo Santos</p>
                  <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mt-1">Mestre Barbeiro & Fundador</p>
                </div>
              </div>
              <p className="text-sm italic text-white/70 font-medium leading-relaxed relative z-10">
                &quot;Cada corte é uma assinatura do meu ofício. Espero proporcionar a você a melhor experiência em cuidados masculinos.&quot;
              </p>
              <Scissors className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5 rotate-12" />
            </Card>
          </aside>
        </div>
      </main>

      <footer className="bg-white border-t border-outline-variant/30 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
             <h2 className="text-2xl font-bold text-primary tracking-tighter">Gendei</h2>
             <p className="text-sm text-outline font-medium leading-relaxed">O Padrão de Excelência em Cuidados Masculinos. Experimente a arte da precisão.</p>
          </div>
          <div className="flex flex-col gap-3 font-bold text-[10px] uppercase tracking-[0.3em] text-outline">
             <Link href="#" className="hover:text-secondary transition-colors">Localização</Link>
             <Link href="#" className="hover:text-secondary transition-colors">Preços</Link>
             <Link href="#" className="hover:text-secondary transition-colors">Políticas</Link>
             <Link href="#" className="hover:text-secondary transition-colors">Contato</Link>
          </div>
          <div className="flex justify-end gap-4 h-fit">
             <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-outline-variant/30 hover:border-secondary hover:text-secondary transition-all">
                <Share2 className="w-5 h-5" />
             </Button>
             <Button variant="outline" size="icon" className="rounded-full h-12 w-12 border-outline-variant/30 hover:border-secondary hover:text-secondary transition-all">
                <PhoneCall className="w-5 h-5" />
             </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-outline-variant/10 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-outline/40">
           © 2023 GENDEI PREMIUM GROOMING. TODOS OS DIREITOS RESERVADOS.
        </div>
      </footer>
    </div>
  );
}
