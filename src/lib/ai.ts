const LLM_API_KEY = process.env.LLM_API_KEY || "";
const LLM_API_URL = process.env.LLM_API_URL || "https://ark.cn-beijing.volces.com/api/v3";
const LLM_MODEL = process.env.LLM_MODEL || "doubao-pro-32k";

export interface AIMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callLLM(
  messages: AIMessage[],
  options: { temperature?: number; maxTokens?: number; stream?: boolean } = {}
) {
  const { temperature = 0.7, maxTokens = 2048, stream = false } = options;

  const response = await fetch(`${LLM_API_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${LLM_API_KEY}`,
    },
    body: JSON.stringify({
      model: LLM_MODEL,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LLM API error: ${response.status} ${error}`);
  }

  if (stream && response.body) {
    return response.body;
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

export async function generateQuiz(topic: string, level: string = "beginner") {
  const systemPrompt = `你是一个AI学习助手，擅长根据用户需求生成高质量的练习题。
请生成5道关于"${topic}"的选择题，适合${level}水平。
严格按以下JSON格式输出：
{
  "questions": [
    {
      "question": "题目",
      "options": ["A", "B", "C", "D"],
      "answer": "正确选项字母",
      "explanation": "解析"
    }
  ]
}`;

  const result = await callLLM([
    { role: "system", content: systemPrompt },
    { role: "user", content: `请生成关于"${topic}"的练习题` },
  ], { temperature: 0.8 });

  try {
    const match = result.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(result);
  } catch {
    return { questions: [{ question: result, options: [], answer: "", explanation: "" }] };
  }
}

export async function gradeAnswer(question: string, userAnswer: string, correctAnswer: string) {
  const result = await callLLM([
    {
      role: "system",
      content: `你是一个AI批改助手。判断用户答案是否正确，给出简短解析。
严格按JSON格式输出：{"correct": true/false, "score": 0-100, "feedback": "反馈内容"}`,
    },
    {
      role: "user",
      content: `题目：${question}\n正确答案：${correctAnswer}\n用户答案：${userAnswer}`,
    },
  ], { temperature: 0.3 });

  try {
    const match = result.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    return JSON.parse(result);
  } catch {
    return { correct: false, score: 0, feedback: result };
  }
}
