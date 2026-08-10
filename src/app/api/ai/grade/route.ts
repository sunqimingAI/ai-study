import { NextResponse } from "next/server";
import { gradeAnswer } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { question, userAnswer, correctAnswer } = (await request.json()) as {
      question: string;
      userAnswer: string;
      correctAnswer: string;
    };

    if (!question || userAnswer === undefined || correctAnswer === undefined) {
      return NextResponse.json(
        { error: "缺少必填参数" },
        { status: 400 }
      );
    }

    const result = await gradeAnswer(question, userAnswer, correctAnswer);

    return NextResponse.json(result);
  } catch (error) {
    console.error("批改失败:", error);
    return NextResponse.json(
      { error: "批改失败，请稍后重试" },
      { status: 500 }
    );
  }
}
