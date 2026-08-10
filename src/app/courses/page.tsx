"use client";

import { useMemo, useState } from "react";
import { CourseCard } from "@/components/shared/course-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Course } from "@/types";
import { cn } from "@/lib/utils";

const categories = [
  { value: "all", label: "全部" },
  { value: "AI基础", label: "AI 基础" },
  { value: "Prompt", label: "Prompt" },
  { value: "AI绘图", label: "AI 绘图" },
  { value: "AI编程", label: "AI 编程" },
  { value: "行业应用", label: "行业应用" },
];

const levels = [
  { value: "all", label: "全部难度" },
  { value: "beginner", label: "初级" },
  { value: "intermediate", label: "中级" },
  { value: "advanced", label: "高级" },
];

const mockCourses: Course[] = [
  {
    id: "1",
    title: "AI 基础入门",
    description: "从零认识人工智能，了解核心概念、发展历程与未来趋势。",
    category: "AI基础",
    level: "beginner",
    lessons: 24,
    duration: 120,
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop",
  },
  {
    id: "2",
    title: "Prompt 工程实战",
    description: "掌握提示词设计技巧，让大模型输出精准、高效、可控。",
    category: "Prompt",
    level: "intermediate",
    lessons: 32,
    duration: 150,
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop",
  },
  {
    id: "3",
    title: "AI 绘图从 0 到 1",
    description: "Stable Diffusion、Midjourney 全流程实战，打造惊艳视觉作品。",
    category: "AI绘图",
    level: "beginner",
    lessons: 28,
    duration: 140,
    coverImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=450&fit=crop",
  },
  {
    id: "4",
    title: "AI 编程利器",
    description: "Copilot、Cursor、Codeium 等工具深度解析，提升编码效率 10 倍。",
    category: "AI编程",
    level: "intermediate",
    lessons: 20,
    duration: 100,
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
  },
  {
    id: "5",
    title: "AI 行业应用解析",
    description: "金融、医疗、教育、电商等行业的 AI 落地案例全景解读。",
    category: "行业应用",
    level: "advanced",
    lessons: 36,
    duration: 180,
    coverImage:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?w=800&h=450&fit=crop",
  },
  {
    id: "6",
    title: "大模型原理与微调",
    description: "深入 Transformer 架构，掌握 LoRA、QLoRA 等高效微调技术。",
    category: "AI基础",
    level: "advanced",
    lessons: 40,
    duration: 220,
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
  },
  {
    id: "7",
    title: "AI 写作与内容创作",
    description: "用 AI 辅助文案、小说、公众号写作，让创意源源不断。",
    category: "Prompt",
    level: "beginner",
    lessons: 18,
    duration: 90,
    coverImage:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&h=450&fit=crop",
  },
  {
    id: "8",
    title: "AI 短视频运营",
    description: "用 AI 生成脚本、配音、字幕，高效产出爆款短视频。",
    category: "行业应用",
    level: "intermediate",
    lessons: 22,
    duration: 110,
    coverImage:
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&h=450&fit=crop",
  },
];

export default function CoursesPage() {
  const [category, setCategory] = useState("all");
  const [level, setLevel] = useState("all");

  const filtered = useMemo(() => {
    return mockCourses.filter((c) => {
      const categoryMatch = category === "all" || c.category === category;
      const levelMatch = level === "all" || c.level === level;
      return categoryMatch && levelMatch;
    });
  }, [category, level]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">课程中心</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          精选 AI 课程，从入门到精通，助你快速成长
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-56">
          <div className="sticky top-20 space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold">分类</h3>
              <nav className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={cn(
                      "rounded-md px-3 py-2 text-left text-sm transition-colors",
                      category === cat.value
                        ? "bg-primary text-primary-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold">难度</h3>
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
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              共 <span className="font-medium text-foreground">{filtered.length}</span> 门课程
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-lg border py-16 text-center text-muted-foreground">
              <p>暂无符合条件的课程</p>
              <button
                type="button"
                onClick={() => {
                  setCategory("all");
                  setLevel("all");
                }}
                className="text-sm text-primary hover:underline"
              >
                清除筛选
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
