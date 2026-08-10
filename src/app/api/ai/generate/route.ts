import { NextResponse } from "next/server";
import { generateQuiz } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { topic, level } = (await request.json()) as {
      topic: string;
      level?: string;
    };

    if (!topic) {
      return NextResponse.json(
        { error: "缺少 topic 参数" },
        { status: 400 }
      );
    }

    const quiz = await generateQuiz(topic, level || "beginner");

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("出题失败:", error);
    return NextResponse.json(
      { error: "出题失败，请稍后重试" },
      { status: 500 }
    );
  }
}
