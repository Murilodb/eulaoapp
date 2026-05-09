"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Bell, 
  ShieldCheck, 
  Key, 
  CreditCard,
  Check
} from "lucide-react";
import { motion } from "motion/react";

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = React.useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar active="Configurações" />
      
      <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
        <Header title="Configurações" description="Configure perfis da loja, regras operacionais e preferências do sistema." />

        <div className="max-w-4xl mx-auto space-y-8 pb-20">
          {/* Shop Profile */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Building2 className="text-secondary w-5 h-5" />
              <h3 className="text-xl font-bold text-primary tracking-tight">Perfil da Loja</h3>
            </div>
            
            <Card className="p-8 space-y-8 bg-surface-container-lowest border-none shadow-premium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Nome da Barbearia</label>
                    <Input defaultValue="Sentobar Premium Grooming" className="bg-surface-container-low/50 border-none h-12" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Slug (URL)</label>
                    <Input defaultValue="sentobar" disabled className="bg-surface-container-low/30 border-none h-12 italic text-outline" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Telefone de Contato</label>
                    <Input defaultValue="+55 34 99999-0000" className="bg-surface-container-low/50 border-none h-12" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Endereço</label>
                    <Input defaultValue="Shopping Luxury, Sala 101, SP" className="bg-surface-container-low/50 border-none h-12" />
                 </div>
              </div>
            </Card>
          </section>

          {/* Operational Rules */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="text-secondary w-5 h-5" />
              <h3 className="text-xl font-bold text-primary tracking-tight">Regras Operacionais</h3>
            </div>
            
            <Card className="p-8 space-y-6 bg-surface-container-lowest border-none shadow-premium">
              <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                 <div>
                    <p className="text-sm font-bold text-primary">Tempo de Antecedência</p>
                    <p className="text-xs text-outline font-medium">Tempo mínimo antes de um agendamento ser realizado.</p>
                 </div>
                 <select className="h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm font-bold outline-none focus:ring-1 focus:ring-secondary/30">
                    <option>1 Hora</option>
                    <option selected>2 Horas</option>
                    <option>24 Horas</option>
                 </select>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-outline-variant/10">
                 <div>
                    <p className="text-sm font-bold text-primary">Janela de Cancelamento</p>
                    <p className="text-xs text-outline font-medium">Horas antes do agendamento que o cliente pode cancelar.</p>
                 </div>
                 <select className="h-10 px-4 bg-surface-container-low border-none rounded-lg text-sm font-bold outline-none focus:ring-1 focus:ring-secondary/30">
                    <option>1 Hora</option>
                    <option selected>2 Horas</option>
                    <option>12 Horas</option>
                    <option>24 Horas</option>
                 </select>
              </div>

              <div className="flex items-center justify-between py-4">
                 <div>
                    <p className="text-sm font-bold text-primary">Confirmações Automáticas</p>
                    <p className="text-xs text-outline font-medium">Enviar confirmação via WhatsApp imediatamente após agendamento.</p>
                 </div>
                 <div className="h-6 w-12 bg-secondary rounded-full p-1 cursor-pointer flex justify-end">
                    <div className="h-4 w-4 bg-white rounded-full shadow-sm" />
                 </div>
              </div>
            </Card>
          </section>

          {/* Footer Actions */}
          <div className="flex justify-end gap-4 h-14">
             <Button variant="ghost" className="px-8 text-outline font-bold uppercase tracking-widest">Descartar Alterações</Button>
             <Button 
               variant="default" 
               className={`px-10 h-full font-bold uppercase tracking-widest shadow-luxury transition-all ${saveSuccess ? "bg-secondary text-white" : "bg-primary"}`}
               onClick={handleSave}
             >
                {saveSuccess ? <span className="flex items-center gap-2"><Check className="w-4 h-4" /> Alterações Salvas</span> : "Salvar Configurações"}
             </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
