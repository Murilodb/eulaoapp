# Sentobar | Master Barber Console

**Sentobar** (Internal: Gendei) is a professional, multi-tenant micro-SaaS platform designed specifically for the high-end barbering industry. It combines precision scheduling, client management, and automated WhatsApp notifications to provide a premium experience for both shop owners and their clients.

## 🚀 Overview

The platform is built with a **Master-Slave / Multi-tenant** architecture where each barbershop operates in a secure, isolated environment. The design language is **"Modern Noir"**—emphasizing precision, style, and luxury through a disciplined minimalist aesthetic.

---

## 💻 Frontend (Next.js + React + Tailwind)

The frontend is built using **Next.js 15+** with the **App Router**, utilizing a custom design system inspired by high-end grooming lounges.

### Key Pages
- **Login (`/login`):** A cinematic, high-contrast entry point for shop owners and staff.
- **Dashboard (`/dashboard`):** Real-time shop overview with revenue analytics, staff availability, and upcoming bookings.
- **Calendar (`/calendar`):** The engine of the app—a high-precision interactive grid for managing weekly schedules.
- **Services (`/services`):** Management interface for shop menus, pricing, and service durations.
- **Clients (`/clients`):** CRM directory with visit history, membership status, and unified contact info.
- **Bookings (`/book`):** A customer-centric, step-by-step reservation experience.
- **Settings (`/settings`):** Configuration for operational rules, cancellation windows, and shop profiles.

### Design System
- **Typography:** Uses **Inter** for its mathematical precision and modern feel.
- **Colors:** A palette of **Deep Charcoal (#1b1c1c)** and **Warm Gold (#735c00 / #ffe088)**.
- **Components:** Built with a custom Atomic design approach using `class-variance-authority` (CVA) for variant management.
- **Animations:** Powered by **motion/react** (Framer Motion) for smooth, purposeful transitions that guide user focus.

---

## ⚙️ Backend (Node.js + Fastify + Prisma)

*Note: The platform is designed for a Serverless architecture on Vercel.*

### Architecture
- **Framework:** Fastify 4 (Strict Mode TypeScript) for high-performance HTTP routing.
- **Isolation:** **Row-Level Isolation (Row-Level Security)** ensures that data from Barbershop A is never accessible to Barbershop B.
- **ORM:** Prisma for type-safe database queries and migrations.
- **Database:** PostgreSQL (Hosted via Supabase).

### Business Rules (The "Law")
- **RN-01 (Scheduling):** Overlapping bookings are blocked. Time slots are calculated automatically based on service duration.
- **RN-02 (Cancellation):** 2-hour minimum lead time for client cancellations; overrides available only for Admins.
- **RN-03 (Pricing):** All prices are handled in **cents (integer)** to avoid floating-point rounding errors.
- **RN-04 (Tenancy):** `barbershopId` is strictly extracted from the JWT token, never from the request body.

### Notifications
- **WhatsApp Integration:** Powered by **Evolution API**.
- **Queuing:** Built with **Upstash QStash** for serverless offloading of notification tasks.
- **Cron Jobs:** Automated 24h and 1h reminders via **Vercel Cron**.

---

## 🛡️ Security

1. **Authentication:** JWT stored in **HttpOnly, Secure, SameSite=Lax** cookies.
2. **Rate Limiting:** Brute force protection on login using **Upstash Redis**.
3. **Data Integrity:** Schema-level validation using **Zod** across every API endpoint and form.

---

## 🛠️ Tech Stack Summary

| Layer | Technologies |
|---|---|
| **Core** | Next.js 15, TypeScript 5, Node.js 20 |
| **Frontend** | React 19, Tailwind CSS 4, Motion, Lucide-React |
| **Backend** | Fastify, Zod, Prisma |
| **Storage** | PostgreSQL (Supabase), Redis (Upstash) |
| **Async** | QStash (Queues), Vercel Cron |
| **Messaging** | Evolution API (WhatsApp) |

---

> **Design Philosophy:** "The difference between a haircut and a craft is precision." This platform is the digital toolset for that craft.
