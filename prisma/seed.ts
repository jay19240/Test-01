import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialPosts = [
  {
    title: "Introduction à Next.js",
    summary: "Next.js est un framework React moderne...",
    date: new Date('2025-10-01'),
  },
  {
    title: "Découvrir Prisma",
    summary: "Prisma facilite l'accès aux bases de données...",
    date: new Date('2025-10-02'),
  },
  {
    title: "API avec Next.js App Router",
    summary: "Comment créer des routes API modernes avec Next.js 13...",
    date: new Date('2025-10-03')  ,
  },
  {
    title: "Le web est incroyable !",
    summary: "Comment est naît cette formidable aventure...",
    date: new Date('2025-10-04'),
  },
];

const seed = async () => {
  await prisma.article.deleteMany();

  for (const post of initialPosts) {
    await prisma.article.create({
      data: post,
    });
  }
};

seed();