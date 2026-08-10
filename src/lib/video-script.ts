interface VideoScript {
  title: string;
  hook: string;
  scenes: Scene[];
  cta: string;
  tags: string[];
}

interface Scene {
  duration: number;
  description: string;
  narration: string;
  visualPrompt: string;
}

const PLATFORM_OPTIMIZED: Record<string, {
  maxDuration: number;
  aspectRatio: string;
  style: string;
}> = {
  wechat: { maxDuration: 60, aspectRatio: "9:16", style: "warm and professional" },
  douyin: { maxDuration: 45, aspectRatio: "9:16", style: "fast-paced and energetic" },
  xiaohongshu: { maxDuration: 90, aspectRatio: "3:4", style: "aesthetic and lifestyle" },
};

export async function generateVideoScript(
  topic: string,
  platform: "wechat" | "douyin" | "xiaohongshu" = "wechat"
): Promise<VideoScript> {
  const config = PLATFORM_OPTIMIZED[platform];
  const systemPrompt = `你是一个短视频脚本专家，擅长为${platform === "wechat" ? "微信视频号" : platform === "douyin" ? "抖音" : "小红书"}创作内容。
平台特点：${config.style}，视频时长不超过${config.maxDuration}秒，画面比例${config.aspectRatio}。

请为"${topic}"创作一个短视频脚本，严格按以下JSON格式输出：
{
  "title": "标题（不超过20字）",
  "hook": "开头3秒钩子文案（吸引用户继续看）",
  "scenes": [
    {
      "duration": 秒数,
      "description": "画面描述",
      "narration": "旁白/字幕",
      "visualPrompt": "AI生成画面的提示词"
    }
  ],
  "cta": "结尾引导关注/互动的文案",
  "tags": ["标签1", "标签2", "标签3"]
}`;

  const response = await fetch(`${process.env.LLM_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.LLM_MODEL || "doubao-pro-32k",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `请生成关于"${topic}"的短视频脚本` },
      ],
      temperature: 0.8,
    }),
  });

  const data = await response.json();
  const content = data.choices[0]?.message?.content || "";

  try {
    const match = content.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(content);
  } catch {
    return {
      title: topic,
      hook: "你知道吗？",
      scenes: [{ duration: config.maxDuration, description: content, narration: content, visualPrompt: topic }],
      cta: "关注我，学习更多 AI 知识！",
      tags: ["AI", topic],
    };
  }
}

export function getPlatformConfig(platform: string) {
  return PLATFORM_OPTIMIZED[platform] || PLATFORM_OPTIMIZED.wechat;
}
