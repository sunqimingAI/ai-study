import { VideoCard } from "@/components/shared/video-card";
import type { VideoItem } from "@/types";

interface VideoShowcaseProps {
  videos: VideoItem[];
  title?: string;
  description?: string;
}

export function VideoShowcase({
  videos,
  title = "短视频精选",
  description = "来自视频号、抖音、小红书的优质 AI 内容",
}: VideoShowcaseProps) {
  return (
    <section className="border-t bg-muted/30 py-16">
      <div className="container">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </section>
  );
}
