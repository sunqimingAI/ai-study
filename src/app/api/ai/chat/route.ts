import { NextResponse } from "next/server";
import { callLLM, AIMessage } from "@/lib/ai";
import { ChatMessage } from "@/types";

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "消息不能为空" },
        { status: 400 }
      );
    }

    const aiMessages: AIMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const stream = await callLLM(aiMessages, { stream: true });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI 对话失败:", error);
    return NextResponse.json(
      { error: "AI 对话失败，请稍后重试" },
      { status: 500 }
    );
  }
}
