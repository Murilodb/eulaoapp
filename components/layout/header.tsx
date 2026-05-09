"use client";

import * as React from "react";
import { Search, Bell, Moon } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <>
      <header className="h-16 border-b border-outline-variant bg-surface/80 backdrop-blur-md fixed top-0 right-0 left-64 z-40 flex items-center justify-between px-8">
        <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-96 border border-outline-variant/30 focus-within:ring-1 focus-within:ring-secondary transition-all">
          <Search className="w-4 h-4 text-outline" />
          <input 
            type="text" 
            placeholder="Buscar clientes, agendamentos..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 placeholder:text-outline/50"
          />
        </div>

        <div className="flex items-center gap-6">
          <button className="relative text-outline hover:text-secondary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full border-2 border-surface" />
          </button>
          <button className="text-outline hover:text-secondary transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          
          <div className="h-8 w-px bg-outline-variant/30 mx-2" />
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-xs font-bold text-primary">Marcus Vane</p>
              <p className="text-[9px] text-outline uppercase tracking-widest font-medium">Master Barber</p>
            </div>
            <div className="h-10 w-10 rounded-full overflow-hidden border border-outline-variant relative">
              <Image 
                src="https://picsum.photos/seed/marcus/200/200" 
                alt="Avatar" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex justify-between items-end mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h2 className="text-3xl font-bold text-primary tracking-tight">{title}</h2>
          {description && <p className="text-sm text-outline mt-1 font-medium">{description}</p>}
        </motion.div>
      </div>
    </>
  );
}
