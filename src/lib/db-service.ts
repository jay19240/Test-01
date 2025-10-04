import { Article } from "@/generated/prisma";
import { prisma } from "./prisma";

export async function searchArticles(text: string, sortOrder: 'asc' | 'desc'): Promise<Article[]> {
  return prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: text } },
        { summary: { contains: text } },
      ],
    },
    orderBy: {
      date: sortOrder,
    },
  });
}

export async function getArticles(): Promise<Article[]> {
  return prisma.article.findMany();
}

export async function createArticle(title: string, summary: string): Promise<Article> {
  const newArticle = await prisma.article.create({
    data: {
      title,
      summary,
      date: new Date(),
    },
  });

  return newArticle;
}