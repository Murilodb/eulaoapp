"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Scissors, Mail, Lock, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [stayLoggedIn, setStayLoggedIn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Credenciais inválidas. Tente novamente.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-on-surface flex items-center justify-center overflow-hidden font-sans">
      {/* Ambient Background Decoration */}
      <div className="fixed inset-0 luxury-gradient opacity-100 z-0" />
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none z-0 mix-blend-overlay"
        style={{ 
          backgroundImage: `url('https://picsum.photos/seed/barber-dark/1920/1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <main className="relative z-10 w-full max-w-[480px] px-8">
        {/* Logo Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <Scissors className="text-secondary-fixed w-10 h-10" />
            <h1 className="text-3xl font-bold text-surface tracking-tight uppercase">Sentobar</h1>
          </div>
          <p className="text-xs font-semibold text-outline uppercase tracking-[0.2em]">Console Master de Barbearia</p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-primary-container border-on-primary-fixed-variant/30 rounded-xl p-4 shadow-luxury backdrop-blur-sm">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl text-surface">Entrar</CardTitle>
              <CardDescription className="text-sm text-on-primary-container">
                Insira suas credenciais para acessar o painel.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-error/10 border border-error/20 text-error text-xs p-3 rounded-lg flex items-center justify-center font-bold">
                    {error}
                  </div>
                )}
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-outline uppercase tracking-wider" htmlFor="email">Endereço de E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
                    <Input 
                      className="bg-on-surface border-outline-variant/20 pl-12 text-surface focus-visible:ring-secondary-fixed h-14" 
                      id="email" 
                      name="email" 
                      placeholder="name@sentobar.com" 
                      type="email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-semibold text-outline uppercase tracking-wider" htmlFor="password">Senha</label>
                    <Link href="#" className="text-xs font-semibold text-secondary-fixed hover:text-secondary-container transition-colors">Esqueceu?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5 pointer-events-none" />
                    <Input 
                      className="bg-on-surface border-outline-variant/20 pl-12 text-surface focus-visible:ring-secondary-fixed h-14" 
                      id="password" 
                      name="password" 
                      placeholder="••••••••" 
                      type="password"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => setStayLoggedIn(!stayLoggedIn)}
                >
                  <div className={cn(
                    "w-5 h-5 rounded border border-outline-variant/20 flex items-center justify-center transition-all",
                    stayLoggedIn ? "bg-secondary-fixed border-secondary-fixed" : "bg-on-surface"
                  )}>
                    {stayLoggedIn && <Check className="w-3 h-3 text-on-secondary-fixed stroke-[3px]" />}
                  </div>
                  <span className="text-sm text-on-primary-container group-hover:text-surface transition-colors select-none">
                    Permanecer conectado por 30 dias
                  </span>
                </div>

                {/* Login Button */}
                <Button 
                  type="submit"
                  variant="premium" 
                  size="xl" 
                  className="w-full text-base font-bold flex items-center justify-center gap-2 group h-14"
                  disabled={loading}
                >
                  {loading ? "Entrando..." : "Entrar"}
                  <ArrowRight className={cn("w-5 h-5 group-hover:translate-x-1 transition-transform", loading && "opacity-50")} />
                </Button>
              </form>

              <div className="mt-10 pt-8 border-t border-outline-variant/10 text-center">
                <p className="text-sm text-on-primary-container">
                  Precisa de assistência técnica?{" "}
                  <Link href="#" className="text-secondary-fixed font-bold hover:underline">Contatar Suporte</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Decorative Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center opacity-30"
        >
          <p className="text-[10px] font-semibold text-outline tracking-[0.3em] uppercase">Precisão • Estilo • Autoridade</p>
        </motion.div>
      </main>

      {/* Side Visual Element (Luxury Preview) */}
      <div className="hidden lg:block fixed right-0 top-0 h-full w-1/3 p-6 pointer-events-none overflow-hidden sm:w-1/4 lg:w-1/3 xl:w-2/5">
        <div className="w-full h-full relative rounded-l-3xl overflow-hidden border-l border-t border-b border-outline-variant/10">
          <Image 
            src="https://picsum.photos/seed/barbershop-luxury/1200/1800"
            alt="Luxury Barbering"
            fill
            className="object-cover grayscale opacity-40 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-on-surface via-on-surface/50 to-transparent" />
          
          <div className="absolute bottom-16 left-16 max-w-sm space-y-6">
            <div className="h-1 w-16 bg-secondary-fixed" />
            <h3 className="text-3xl font-semibold text-surface leading-tight">
              &quot;A diferença entre um corte e uma obra.&quot;
            </h3>
            <p className="text-lg text-outline leading-relaxed font-light">
              Gerencie as operações da sua barbearia com precisão incomparável e elegância moderna.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
