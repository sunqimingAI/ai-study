"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Loader2, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

interface GradeResult {
  correct: boolean;
  score?: number;
  feedback?: string;
}

const levels = [
  { value: "beginner", label: "初级" },
  { value: "intermediate", label: "中级" },
  { value: "advanced", label: "高级" },
];

export default function AIGeneratePage() {
  const [topic, setTopic] = useState("");
  const [level, setLevel] = useState("beginner");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [gradeResults, setGradeResults] = useState<Record<number, GradeResult>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGrading, setIsGrading] = useState<number | null>(null);

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("请输入题目主题");
      return;
    }

    setIsGenerating(true);
    setQuestions([]);
    setUserAnswers({});
    setGradeResults({});

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, level }),
      });

      if (!res.ok) {
        throw new Error("生成失败");
      }

      const data = await res.json();
      const list: QuizQuestion[] = Array.isArray(data)
        ? data
        : data.questions ?? [];
      setQuestions(list);
      toast.success(`生成了 ${list.length} 道题目`);
    } catch {
      toast.error("生成题目失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  }

  function selectAnswer(questionIdx: number, answer: string) {
    if (gradeResults[questionIdx]) return;
    setUserAnswers((prev) => ({ ...prev, [questionIdx]: answer }));
  }

  async function handleGrade(questionIdx: number) {
    const question = questions[questionIdx];
    const userAnswer = userAnswers[questionIdx];
    if (!userAnswer) {
      toast.error("请先选择答案");
      return;
    }

    setIsGrading(questionIdx);

    try {
      const res = await fetch("/api/ai/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: question.question,
          userAnswer,
          correctAnswer: question.correctAnswer,
        }),
      });

      if (!res.ok) throw new Error("批改失败");

      const data = await res.json();
      setGradeResults((prev) => ({ ...prev, [questionIdx]: data }));
      toast.success(data.correct ? "回答正确！" : "回答错误");
    } catch {
      toast.error("批改失败");
    } finally {
      setIsGrading(null);
    }
  }

  const correctCount = Object.values(gradeResults).filter((r) => r.correct).length;

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">AI 智能出题</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          输入主题，让 AI 为你生成练习题，边学边练更高效
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">题目主题</label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="例如：大语言模型的应用、Python 装饰器、市场营销策略..."
              rows={2}
            />
          </div>
          <div className="w-full md:w-40 space-y-2">
            <label className="text-sm font-medium">难度</label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {levels.map((lv) => (
                  <SelectItem key={lv.value} value={lv.value}>
                    {lv.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleGenerate} disabled={isGenerating} className="md:w-auto">
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                生成题目
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {questions.length > 0 && (
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            共 <span className="font-medium text-foreground">{questions.length}</span> 道题
            {Object.keys(gradeResults).length > 0 && (
              <>
                ，已批改 <span className="font-medium text-foreground">{Object.keys(gradeResults).length}</span> 道
                ，正确 <span className="font-medium text-green-600">{correctCount}</span> 道
              </>
            )}
          </p>
        </div>
      )}

      <div className="space-y-6">
        {questions.map((q, idx) => {
          const selected = userAnswers[idx];
          const result = gradeResults[idx];

          return (
            <Card key={idx}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {idx + 1}
                  </span>
                  <p className="font-medium leading-relaxed">{q.question}</p>
                </div>

                <div className="ml-10 space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selected === opt;
                    const isCorrect = result && opt === q.correctAnswer;
                    const isWrong = result && isSelected && !result.correct;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => selectAnswer(idx, opt)}
                        disabled={!!result}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                          isCorrect && "border-green-500 bg-green-50 dark:bg-green-500/10",
                          isWrong && "border-red-500 bg-red-50 dark:bg-red-500/10",
                          !result && isSelected && "border-primary bg-primary/5",
                          !result && !isSelected && "hover:bg-muted/50"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                            isCorrect && "border-green-500 text-green-600",
                            isWrong && "border-red-500 text-red-600",
                            !result && isSelected && "border-primary text-primary",
                            !result && !isSelected && "border-muted-foreground/40 text-muted-foreground"
                          )}
                        >
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                        {isCorrect && <CheckCircle2 className="ml-auto h-4 w-4 text-green-600" />}
                        {isWrong && <XCircle className="ml-auto h-4 w-4 text-red-600" />}
                      </button>
                    );
                  })}
                </div>

                <div className="ml-10 mt-4 flex items-center justify-between">
                  {result?.feedback ? (
                    <p className="text-sm text-muted-foreground">{result.feedback}</p>
                  ) : (
                    q.explanation && (
                      <p className="text-sm text-muted-foreground">提示：{q.explanation}</p>
                    )
                  )}
                  {!result && (
                    <Button
                      size="sm"
                      onClick={() => handleGrade(idx)}
                      disabled={!selected || isGrading === idx}
                    >
                      {isGrading === idx ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          批改中...
                        </>
                      ) : (
                        "提交批改"
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
