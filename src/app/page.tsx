import { Hero } from "@/components/home/hero";
import { CourseSection } from "@/components/home/course-section";
import { VideoShowcase } from "@/components/home/video-showcase";
import type { Course, VideoItem } from "@/types";

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
];

const mockVideos: VideoItem[] = [
  {
    id: "v1",
    title: "5 分钟看懂什么是大语言模型",
    thumbnail:
      "https://images.unsplash.com/photo-1676299081847-5c0c5fb32a0f?w=600&h=338&fit=crop",
    platform: "wechat",
    url: "https://channels.weixin.qq.com",
    views: 12500,
  },
  {
    id: "v2",
    title: "Prompt 工程师月薪 3 万？这个职业火了",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=338&fit=crop",
    platform: "douyin",
    url: "https://www.douyin.com",
    views: 28900,
  },
  {
    id: "v3",
    title: "AI 绘图小姐姐，用 Midjourney 画出赛博朋克",
    thumbnail:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=338&fit=crop",
    platform: "xiaohongshu",
    url: "https://www.xiaohongshu.com",
    views: 8600,
  },
  {
    id: "v4",
    title: "程序员必备：AI 编程神器 Top 5",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=338&fit=crop",
    platform: "douyin",
    url: "https://www.douyin.com",
    views: 15300,
  },
  {
    id: "v5",
    title: "AI 老师怎么上课？带你走进智能课堂",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=338&fit=crop",
    platform: "wechat",
    url: "https://channels.weixin.qq.com",
    views: 6200,
  },
  {
    id: "v6",
    title: "AI 副业大揭秘：普通人如何靠 AI 月入过万",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=338&fit=crop",
    platform: "xiaohongshu",
    url: "https://www.xiaohongshu.com",
    views: 42100,
  },
];

export default function Home() {
  return (
    <div>
      <Hero />
      <CourseSection courses={mockCourses} />
      <VideoShowcase videos={mockVideos} />
    </div>
  );
}
