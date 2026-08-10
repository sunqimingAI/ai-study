import { NextResponse } from "next/server";
import { generateVideoScript } from "@/lib/video-script";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, platform } = body;

    if (!topic) {
      return NextResponse.json({ error: "缺少 topic 参数" }, { status: 400 });
    }

    const script = await generateVideoScript(topic, platform);

    return NextResponse.json({ script });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "生成脚本失败" },
      { status: 500 }
    );
  }
}
