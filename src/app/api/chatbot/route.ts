// app/api/faq/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface FaqItem {
    id: string,
    question: string,
    answer: string,
    sources: []
}

const MATCHING_VALUE_MIN_THRESHOLD = 30; // score minimum en dessous duquel ont trouve aucune correspondance réelles

export async function POST(request: NextRequest) {
  const { message } = await request.json();

  const faqPath = path.join(process.cwd(), "data", "faq.json");
  const faqData = JSON.parse(fs.readFileSync(faqPath, "utf-8"));

  let max = 0;
  let maxIndex = 0;

  for (let i = 0; i < faqData.length; i++) {
    const value = calcMatchingValueOfFaqItem(faqData[i], message);
    if (value > max) {
      max = value;
      maxIndex = i;
    }
  }

  if (max < MATCHING_VALUE_MIN_THRESHOLD) {
    return NextResponse.json({ answer: "Question non trouvée.", sources: [] });
  }

  return NextResponse.json({
    answer: faqData[maxIndex].answer,
    sources: faqData[maxIndex].sources,
  });
}

function calcMatchingValueOfFaqItem(faqItem: FaqItem, message: string) {
  let bonusWords = faqItem.id.split('-');
  let match = 0;
  let messageTokenized = message.toLowerCase().split(' ');
  let lastMatch = 0;

  for (let token of messageTokenized) {
    token.replaceAll(/\b\w\'/g, '');
  }

  for (let token of messageTokenized) {
    if (faqItem.question.toLowerCase().includes(token)) {
      match += 10 * token.length + (lastMatch * 10); // plus le mot est long, plus la valeur de correspondance sera elevée, de même si il y a des correspondances à la suite
      lastMatch++;
    }
    else {
      lastMatch = 0;
    }
  }

  for (let token of messageTokenized) {
    for (let bonus of bonusWords) {
      if (bonus == token) {
        match += 20;
      }
    }
  }

  return match;
}