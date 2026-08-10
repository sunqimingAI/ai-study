import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/courses", label: "课程中心" },
    { href: "/ai", label: "AI 助手" },
    { href: "/videos", label: "视频库" },
  ],
  company: [
    { href: "/about", label: "关于我们" },
    { href: "/contact", label: "联系我们" },
    { href: "/privacy", label: "隐私政策" },
    { href: "/terms", label: "服务条款" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div className="flex flex-col gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-base font-bold tracking-tight">AI 学堂</span>
          </Link>
          <p className="max-w-sm text-sm text-muted-foreground">
            用 AI 助力你的学习之旅，精选课程、智能助手、短视频，一站式成长平台。
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">产品</h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.product.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold">公司</h3>
          <ul className="flex flex-col gap-2">
            {footerLinks.company.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} AI 学堂. 保留所有权利.</p>
          <p>Made with ❤️ using Next.js + Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
