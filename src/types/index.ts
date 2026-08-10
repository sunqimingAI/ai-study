export interface Course {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  category: string;
  level: string;
  lessons: number;
  duration: number;
}

export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  platform: "wechat" | "douyin" | "xiaohongshu";
  url: string;
  views: number;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}
