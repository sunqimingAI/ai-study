import Link from "next/link";
import { ArrowRight, Sparkles, GraduationCap, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background via-primary/5 to-background">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.15),transparent_50%)]"
      />
      <div className="container flex flex-col items-center gap-8 py-20 text-center md:py-28">
        <div className="inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          AI 驱动的个性化学习平台
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          AI 学习，
          <br className="md:hidden" />
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            从这里开始
          </span>
        </h1>

        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          精选 AI 课程、智能学习助手、短视频实战案例，助你在人工智能时代快速成长。
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link
            href="/courses"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
          >
            开始学习
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/ai"
            className="inline-flex h-11 items-center gap-2 rounded-md border bg-background px-6 text-sm font-semibold shadow-sm transition-colors hover:bg-muted"
          >
            体验 AI 助手
          </Link>
        </div>

        <div className="mt-8 grid w-full max-w-2xl grid-cols-3 gap-4 border-t pt-8">
          <div className="flex flex-col items-center gap-1">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">100+</span>
            <span className="text-xs text-muted-foreground">精品课程</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">24/7</span>
            <span className="text-xs text-muted-foreground">AI 答疑</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">50w+</span>
            <span className="text-xs text-muted-foreground">学员信赖</span>
          </div>
        </div>
      </div>
    </section>
  );
}
