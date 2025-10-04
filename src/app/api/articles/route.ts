// app/api/articles/route.ts
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { searchArticles, createArticle } from "../../../lib/db-service";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const sort = (searchParams.get("sort") as "asc" | "desc") || "desc";

  const articles = await searchArticles(query, sort);
  return NextResponse.json({ articles });
}

export async function POST(request: NextRequest) {
  const ArticleSchema = z.object({
    title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
    summary: z.string().min(10, "Le résumé doit contenir au moins 10 caractères")
  });

  const body = await request.json();

  // Validation
  const parsed = ArticleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: z.flattenError(parsed.error) },
      { status: 400 }
    );
  }

  const { title, summary } = parsed.data;
  const newArticle = await createArticle(title, summary);
  return NextResponse.json(newArticle, { status: 201 });
}