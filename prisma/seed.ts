import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  
  const tenant = await prisma.tenant.upsert({
    where: { slug: "gendei-master" },
    update: {},
    create: {
      name: "Gendei Master",
      slug: "gendei-master",
      address: "Rua Nefertiti, 123",
      phone: "(11) 99999-9999",
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@gendei.com.br" },
    update: {},
    create: {
      email: "admin@gendei.com.br",
      name: "Administrador",
      password: hashedPassword,
      role: "ADMIN",
      tenantId: tenant.id,
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
