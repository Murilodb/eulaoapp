"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { Plus, Clock, Scissors, Trash2, Edit, Star, Smile } from "lucide-react";
import Image from "next/image";

export default function ServicesPage() {
  const [services, setServices] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchServices();
  }, []);

  const formatPrice = (priceInCents: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceInCents / 100);
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar active="Serviços" />
      
      <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
        <Header title="Gestão de Serviços" description="Configure e gerencie o menu de serviços profissionais da sua barbearia." />

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center mb-10">
            <div /> {/* Placeholder for alignment */}
            <Button variant="default" className="bg-primary text-white hover:bg-secondary transition-all px-6 h-12 flex items-center gap-2 group shadow-premium ring-offset-2 focus:ring-2 focus:ring-secondary">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Adicionar Serviço</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 group hover:border-secondary/50 transition-all duration-300">
                  <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-outline-variant/10">
                    <Image 
                      src={service.image || `https://picsum.photos/seed/${service.id}/600/400`} 
                      alt={service.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    {service.tag && (
                      <div className="absolute top-4 right-4 bg-primary/95 text-white px-3 py-1 rounded-md text-[9px] font-bold tracking-widest uppercase shadow-premium">
                        {service.tag}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-primary tracking-tight">{service.name}</h3>
                    <span className="text-xl font-bold text-secondary tracking-tighter">
                      {typeof service.price === 'number' ? formatPrice(service.price) : service.price}
                    </span>
                  </div>

                  <div className="flex items-center text-outline gap-6 mb-8 mt-2">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider">
                        {service.duration} {typeof service.duration === 'number' ? 'MIN' : ''}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-bold">
                      <Scissors className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-wider">{service.category || 'Geral'}</span>
                    </div>
                  </div>

                  <div className="flex gap-3 border-t border-outline-variant/10 pt-4">
                    <Button variant="outline" className="flex-1 h-10 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all group">
                      <Edit className="w-3.5 h-3.5 mr-2 group-hover:scale-110 transition-transform" />
                      Editar
                    </Button>
                    <Button variant="outline" size="icon" className="h-10 w-10 border-outline-variant/20 hover:border-error hover:text-error transition-all">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Quick Insights Bento Cell */}
            <Card className="bg-primary p-8 flex flex-col justify-between shadow-luxury border-none lg:row-span-1">
              <div className="space-y-8">
                <h4 className="text-secondary font-bold text-[10px] uppercase tracking-[0.2em]">Insights Rápidos</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Serviços Ativos</p>
                    <p className="text-white text-3xl font-bold tracking-tighter">12</p>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Preço Médio</p>
                    <p className="text-white text-3xl font-bold tracking-tighter">R$ 55</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-white/40 text-xs font-semibold uppercase tracking-wider">Categoria</p>
                    <p className="text-secondary text-3xl font-bold tracking-tighter">Clássico</p>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full h-12 py-4 border-secondary text-secondary hover:bg-secondary hover:text-primary transition-all text-xs font-bold uppercase tracking-[0.15em] mt-8">
                 Ver Analíticos
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
