import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BookOpen,
  Clock,
  ChevronRight,
  PlayCircle,
  ListChecks,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/types";

interface CourseDetailPageProps {
  params: { id: string };
}

const levelLabel: Record<string, string> = {
  beginner: "初级",
  intermediate: "中级",
  advanced: "高级",
};

const mockCourses: Course[] & { outline?: { title: string; duration: number }[] }[] = [
  {
    id: "1",
    title: "AI 基础入门",
    description:
      "本课程从最基础的概念讲起，带你一步步走进人工智能的世界。你将了解 AI 的定义、发展历程、核心技术分支，并亲自动手体验简单的 AI 应用。",
    category: "AI基础",
    level: "beginner",
    lessons: 24,
    duration: 120,
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop",
  },
  {
    id: "2",
    title: "Prompt 工程实战",
    description:
      "提示词是与大模型沟通的语言。本课程系统讲解 Prompt 设计原则、技巧与实战案例，帮助你让 AI 输出更精准、更高效。",
    category: "Prompt",
    level: "intermediate",
    lessons: 32,
    duration: 150,
    coverImage:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&h=675&fit=crop",
  },
  {
    id: "3",
    title: "AI 绘图从 0 到 1",
    description:
      "从零开始学习 AI 绘图，覆盖 Stable Diffusion、Midjourney、DALL·E 等主流工具，掌握从创意到成品的全流程。",
    category: "AI绘图",
    level: "beginner",
    lessons: 28,
    duration: 140,
    coverImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=675&fit=crop",
  },
  {
    id: "4",
    title: "AI 编程利器",
    description:
      "AI 正在重塑编程方式。本课程带你掌握 Copilot、Cursor、Codeium 等 AI 编程工具，让编码效率提升 10 倍。",
    category: "AI编程",
    level: "intermediate",
    lessons: 20,
    duration: 100,
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=675&fit=crop",
  },
  {
    id: "5",
    title: "AI 行业应用解析",
    description:
      "AI 已渗透到各行各业。本课程精选金融、医疗、教育、电商等领域的 AI 落地案例，剖析技术架构与商业模式。",
    category: "行业应用",
    level: "advanced",
    lessons: 36,
    duration: 180,
    coverImage:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?w=1200&h=675&fit=crop",
  },
];

const outlineMap: Record<string, { title: string; duration: number }[]> = {
  "1": [
    { title: "什么是人工智能", duration: 8 },
    { title: "AI 发展历程与里程碑", duration: 10 },
    { title: "机器学习基础概念", duration: 12 },
    { title: "深度学习与神经网络", duration: 15 },
    { title: "大语言模型简介", duration: 18 },
    { title: "AI 的未来趋势", duration: 12 },
  ],
  "2": [
    { title: "Prompt 工程概述", duration: 10 },
    { title: "基础提示词模板", duration: 15 },
    { title: "角色设定与上下文", duration: 18 },
    { title: "思维链与分步引导", duration: 20 },
    { title: "结构化输出控制", duration: 15 },
    { title: "实战：写一篇爆款文案", duration: 22 },
  ],
  "3": [
    { title: "AI 绘图工具概览", duration: 8 },
    { title: "Midjourney 入门", duration: 15 },
    { title: "Stable Diffusion 基础", duration: 18 },
    { title: "ControlNet 精准控制", duration: 20 },
    { title: "风格化与艺术创作", duration: 15 },
    { title: "商业案例实战", duration: 25 },
  ],
  "4": [
    { title: "AI 编程工具全景", duration: 8 },
    { title: "GitHub Copilot 深度用法", duration: 15 },
    { title: "Cursor AI 编辑器", duration: 18 },
    { title: "Codeium 与其他工具", duration: 12 },
    { title: "AI Code Review 实战", duration: 15 },
  ],
  "5": [
    { title: "AI+金融：智能风控", duration: 18 },
    { title: "AI+医疗：辅助诊断", duration: 20 },
    { title: "AI+教育：个性化学习", duration: 15 },
    { title: "AI+电商：智能推荐", duration: 18 },
    { title: "AI 创业机会分析", duration: 22 },
  ],
};

export function generateStaticParams() {
  return mockCourses.map((c) => ({ id: c.id }));
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const course = mockCourses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const outline = outlineMap[course.id] ?? [];

  return (
    <div className="container py-10">
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/courses" className="hover:text-foreground">
          课程中心
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{course.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-xl border bg-card">
            {course.coverImage && (
              <div className="relative aspect-video w-full">
                <Image
                  src={course.coverImage}
                  alt={course.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
            <div className="p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{course.category}</Badge>
                <Badge variant="outline">{levelLabel[course.level] ?? course.level}</Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                {course.title}
              </h1>
              <p className="mt-3 text-muted-foreground">{course.description}</p>

              <div className="mt-5 flex items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  {course.lessons} 课时
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {course.duration} 分钟
                </span>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <Link href="/ai/generate">
                <Button className="w-full" size="lg">
                  <PlayCircle className="h-4 w-4" />
                  开始学习
                </Button>
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                跳转到 AI 练习页面，边学边练
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <ListChecks className="h-5 w-5 text-primary" />
          课程大纲
        </h2>
        <Card>
          <CardContent className="divide-y p-0">
            {outline.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {idx + 1}
                  </span>
                  <span className="font-medium">{item.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.duration} 分钟</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
