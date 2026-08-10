import { VideoCard } from "@/components/shared/video-card";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/types";

const wechatVideos: VideoItem[] = [
  {
    id: "w1",
    title: "5 分钟看懂什么是大语言模型",
    thumbnail:
      "https://images.unsplash.com/photo-1676299081847-5c0c5fb32a0f?w=600&h=338&fit=crop",
    platform: "wechat",
    url: "https://channels.weixin.qq.com",
    views: 12500,
  },
  {
    id: "w2",
    title: "AI 老师怎么上课？带你走进智能课堂",
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=338&fit=crop",
    platform: "wechat",
    url: "https://channels.weixin.qq.com",
    views: 6200,
  },
  {
    id: "w3",
    title: "企业如何用 AI 降本增效",
    thumbnail:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=338&fit=crop",
    platform: "wechat",
    url: "https://channels.weixin.qq.com",
    views: 9800,
  },
];

const douyinVideos: VideoItem[] = [
  {
    id: "d1",
    title: "Prompt 工程师月薪 3 万？这个职业火了",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=338&fit=crop",
    platform: "douyin",
    url: "https://www.douyin.com",
    views: 28900,
  },
  {
    id: "d2",
    title: "程序员必备：AI 编程神器 Top 5",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=338&fit=crop",
    platform: "douyin",
    url: "https://www.douyin.com",
    views: 15300,
  },
  {
    id: "d3",
    title: "AI 换脸术，10 秒生成明星脸",
    thumbnail:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=338&fit=crop",
    platform: "douyin",
    url: "https://www.douyin.com",
    views: 56700,
  },
  {
    id: "d4",
    title: "小学生都在用的 AI 学习工具",
    thumbnail:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=338&fit=crop",
    platform: "douyin",
    url: "https://www.douyin.com",
    views: 32100,
  },
];

const xiaohongshuVideos: VideoItem[] = [
  {
    id: "x1",
    title: "AI 绘图小姐姐，用 Midjourney 画出赛博朋克",
    thumbnail:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&h=338&fit=crop",
    platform: "xiaohongshu",
    url: "https://www.xiaohongshu.com",
    views: 8600,
  },
  {
    id: "x2",
    title: "AI 副业大揭秘：普通人如何靠 AI 月入过万",
    thumbnail:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=338&fit=crop",
    platform: "xiaohongshu",
    url: "https://www.xiaohongshu.com",
    views: 42100,
  },
  {
    id: "x3",
    title: "AI 写爆款小红书文案，30 秒搞定",
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=338&fit=crop",
    platform: "xiaohongshu",
    url: "https://www.xiaohongshu.com",
    views: 18400,
  },
];

const platforms = [
  {
    key: "wechat" as const,
    label: "视频号",
    desc: "微信生态精选内容",
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    videos: wechatVideos,
  },
  {
    key: "douyin" as const,
    label: "抖音",
    desc: "短视频热点聚集地",
    color: "bg-zinc-500/10 text-zinc-800 dark:text-zinc-300 border-zinc-500/20",
    videos: douyinVideos,
  },
  {
    key: "xiaohongshu" as const,
    label: "小红书",
    desc: "种草与生活方式",
    color: "bg-red-500/10 text-red-600 border-red-500/20",
    videos: xiaohongshuVideos,
  },
];

export default function VideoPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">视频专区</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          来自视频号、抖音、小红书的优质 AI 内容，点击即可观看
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {platforms.map((platform) => (
          <div key={platform.key} className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "rounded-lg border px-3 py-1 text-sm font-semibold",
                  platform.color
                )}
              >
                {platform.label}
              </span>
              <span className="text-xs text-muted-foreground">{platform.desc}</span>
            </div>

            <div className="flex flex-col gap-4">
              {platform.videos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
