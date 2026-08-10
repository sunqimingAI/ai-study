import { NextResponse } from "next/server";
import { Course } from "@/types";

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Python 入门到实战",
    description: "从零开始学习 Python 编程语言，掌握基础语法、面向对象、Web 开发等核心技能。",
    category: "编程",
    level: "beginner",
    lessons: 42,
    duration: 180,
  },
  {
    id: "2",
    title: "React 高级进阶",
    description: "深入理解 React 原理，掌握 Hooks、状态管理、性能优化等高级技巧。",
    category: "前端",
    level: "intermediate",
    lessons: 36,
    duration: 150,
  },
  {
    id: "3",
    title: "算法与数据结构",
    description: "系统学习常用算法与数据结构，提升编程思维和问题解决能力。",
    category: "计算机基础",
    level: "intermediate",
    lessons: 50,
    duration: 240,
  },
  {
    id: "4",
    title: "Next.js 全栈开发",
    description: "使用 Next.js 构建现代全栈应用，涵盖 App Router、API Routes、部署等。",
    category: "前端",
    level: "advanced",
    lessons: 28,
    duration: 120,
  },
  {
    id: "5",
    title: "AI 大模型应用开发",
    description: "学习如何调用大模型 API，构建智能对话、出题、批改等 AI 应用。",
    category: "AI",
    level: "advanced",
    lessons: 20,
    duration: 90,
  },
];

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const course = mockCourses.find((c) => c.id === params.id);

  if (!course) {
    return NextResponse.json(
      { error: "课程不存在" },
      { status: 404 }
    );
  }

  return NextResponse.json(course);
}
