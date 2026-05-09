"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, MoreHorizontal, Mail, Phone, Calendar, Filter } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

export default function ClientsPage() {
  const clients = [
    { id: 1, name: "Julian Draxler", email: "julian@email.com", phone: "+55 34 99999-0001", membership: "Gold", lastVisit: "15 Out 2023", appts: 24, avatar: "https://picsum.photos/seed/client1/100/100" },
    { id: 2, name: "Aaron Ramsey", email: "aaron@email.com", phone: "+55 34 99999-0002", membership: "Primeira Visita", lastVisit: "Nunca", appts: 0, avatar: "https://picsum.photos/seed/client2/100/100" },
    { id: 3, name: "Thomas Lemar", email: "thomas@email.com", phone: "+55 34 99999-0003", membership: "Recorrente", lastVisit: "22 Out 2023", appts: 12, avatar: "https://picsum.photos/seed/client3/100/100" },
    { id: 4, name: "Kevin De Bruyne", email: "kevin@email.com", phone: "+55 34 99999-0004", membership: "Recorrente", lastVisit: "10 Out 2023", appts: 8, avatar: "https://picsum.photos/seed/client4/100/100" },
    { id: 5, name: "Leroy Sane", email: "leroy@email.com", phone: "+55 34 99999-0005", membership: "VIP", lastVisit: "20 Out 2023", appts: 42, avatar: "https://picsum.photos/seed/client5/100/100" },
  ];

  return (
    <div className="flex min-h-screen bg-background font-sans">
      <Sidebar active="Clientes" />
      
      <main className="flex-1 ml-64 p-8 pt-24 min-h-screen">
        <Header title="Diretório de Clientes" description="Gerencie sua base de dados de clientes e visualize o histórico de atendimento." />

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-surface p-4 rounded-xl border border-outline-variant/10 shadow-premium">
            <div className="flex items-center gap-4 flex-1 max-w-md">
               <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                  <Input placeholder="Buscar por nome, e-mail ou telefone..." className="pl-10 h-10 border-none bg-surface-container-low/50 focus:ring-1 focus:ring-secondary/20" />
               </div>
               <Button variant="outline" size="icon" className="h-10 w-10 border-outline-variant/20">
                  <Filter className="w-4 h-4" />
               </Button>
            </div>
            <Button variant="default" className="h-10 px-6 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group">
              <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
              Novo Cliente
            </Button>
          </div>

          <Card className="overflow-hidden border-none shadow-premium">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Informação do Cliente</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Vínculo</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Última Visita</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest">Total Agend.</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-outline uppercase tracking-widest text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {clients.map((client, i) => (
                    <motion.tr 
                      key={client.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="hover:bg-surface-container-low transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden border border-outline-variant/30 flex-shrink-0">
                             <Image src={client.avatar} alt={client.name} fill className="object-cover" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-primary">{client.name}</p>
                            <div className="flex items-center gap-3 text-[10px] text-outline font-medium">
                               <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {client.email}</span>
                               <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {client.phone}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                           client.membership === "Gold" ? "bg-secondary-fixed text-on-secondary-fixed" :
                           client.membership === "VIP" ? "bg-primary text-white" :
                           client.membership === "First Visit" ? "bg-surface-variant text-on-surface-variant" :
                           "bg-surface-container text-primary"
                         }`}>
                           {client.membership}
                         </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary">
                           <Calendar className="w-3.5 h-3.5 text-outline" />
                           {client.lastVisit}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                         <p className="text-sm font-mono font-bold text-primary">{client.appts}</p>
                      </td>
                      <td className="px-8 py-6 text-right">
                         <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-surface-container transition-all">
                            <MoreHorizontal className="w-4 h-4" />
                         </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex justify-between items-center text-[10px] font-bold text-outline uppercase tracking-widest px-4">
             <p>Mostrando 5 de 124 clientes</p>
             <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 px-4 border-outline-variant/20" disabled>Anterior</Button>
                <Button variant="outline" size="sm" className="h-8 px-4 border-outline-variant/20 hover:border-secondary hover:text-secondary">Próximo</Button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
