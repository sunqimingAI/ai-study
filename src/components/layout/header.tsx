"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
}

const navItems = [
  { href: "/", label: "首页" },
  { href: "/courses", label: "课程" },
  { href: "/ai", label: "AI助手" },
  { href: "/videos", label: "视频" },
];

export function Header({ user }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = mounted ? resolvedTheme : theme;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold tracking-tight">AI 学堂</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="切换主题"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-muted"
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
          >
            {mounted && currentTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {user ? (
            <Link href="/profile" className="hidden md:block">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "用户头像"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full border object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-primary text-sm font-semibold text-primary-foreground">
                  {user.name?.charAt(0) ?? "U"}
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                "hidden h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
              )}
            >
              登录
            </Link>
          )}

          <button
            type="button"
            aria-label="打开菜单"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!user && (
              <Link
                href="/login"
                className="mt-2 rounded-md bg-primary px-3 py-2 text-center text-sm font-medium text-primary-foreground"
                onClick={() => setMobileOpen(false)}
              >
                登录
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
