import Link from "next/link";
import { Play, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VideoItem } from "@/types";

interface VideoCardProps {
  video: VideoItem;
  className?: string;
}

const platformLabel: Record<VideoItem["platform"], string> = {
  wechat: "视频号",
  douyin: "抖音",
  xiaohongshu: "小红书",
};

const platformColor: Record<VideoItem["platform"], string> = {
  wechat: "bg-emerald-500/90",
  douyin: "bg-black/80",
  xiaohongshu: "bg-red-500/90",
};

function formatViews(views: number) {
  if (views >= 10000) {
    return `${(views / 10000).toFixed(1)}w`;
  }
  return views.toString();
}

export function VideoCard({ video, className }: VideoCardProps) {
  return (
    <Link
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-background/90 p-3 shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 text-foreground" fill="currentColor" />
          </div>
        </div>
        <span
          className={cn(
            "absolute left-2 top-2 rounded px-2 py-0.5 text-[10px] font-medium text-white",
            platformColor[video.platform]
          )}
        >
          {platformLabel[video.platform]}
        </span>
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-[10px] text-white">
          <Eye className="h-3 w-3" />
          {formatViews(video.views)}
        </span>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug">
          {video.title}
        </h3>
      </div>
    </Link>
  );
}
