import Link from "next/link";
import { getServerSession } from "next-auth";
import {
  User,
  Mail,
  BookOpen,
  Clock,
  Star,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";

interface RecentCourse {
  id: string;
  title: string;
  category: string;
  progress: number;
  completed: boolean;
  lessons: number;
}

interface UserData {
  recentCourses: RecentCourse[];
  stats: {
    totalCourses: number;
    completedCourses: number;
    totalLessons: number;
    streakDays: number;
  };
}

async function getUserData(userId: string): Promise<UserData> {
  try {
    const { prisma } = await import("@/lib/prisma");

    const progressList: Array<{
      id: string;
      progress: number;
      completed: boolean;
      course: { id: string; title: string; category: string; lessons: number };
    }> = await prisma.learningProgress.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { updatedAt: "desc" },
      take: 5,
    });

    const progressCount: number = await prisma.learningProgress.count({
      where: { userId },
    });

    const completedCount = progressList.filter(
      (p: { completed: boolean }) => p.completed
    ).length;
    const totalLessons = progressList.reduce(
      (sum: number, p: { course: { lessons: number } }) =>
        sum + (p.course?.lessons ?? 0),
      0
    );

    return {
      recentCourses: progressList.map(
        (p: {
          course: { id: string; title: string; category: string; lessons: number };
          progress: number;
          completed: boolean;
        }) => ({
          id: p.course.id,
          title: p.course.title,
          category: p.course.category,
          progress: p.progress,
          completed: p.completed,
          lessons: p.course.lessons,
        })
      ),
      stats: {
        totalCourses: progressCount,
        completedCourses: completedCount,
        totalLessons,
        streakDays: 7,
      },
    };
  } catch {
    return {
      recentCourses: [],
      stats: {
        totalCourses: 0,
        completedCourses: 0,
        totalLessons: 0,
        streakDays: 0,
      },
    };
  }
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="container flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center gap-4 py-10 text-center">
        <h1 className="text-2xl font-bold">请先登录</h1>
        <p className="text-sm text-muted-foreground">登录后查看你的学习进度和个人信息</p>
        <Button asChild>
          <Link href="/login">去登录</Link>
        </Button>
      </div>
    );
  }

  const userData = await getUserData(session.user.id as string);
  const user = session.user;

  return (
    <div className="container py-10">
      <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {user.name?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              {user.name ?? "用户"}
            </h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              设置
            </Link>
          </Button>
          <form action="/api/auth/signout" method="post">
            <Button variant="ghost" size="sm" type="submit">
              <LogOut className="h-4 w-4" />
              退出登录
            </Button>
          </form>
        </div>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.stats.totalCourses}</p>
              <p className="text-xs text-muted-foreground">学习课程</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.stats.completedCourses}</p>
              <p className="text-xs text-muted-foreground">已完成</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.stats.totalLessons}</p>
              <p className="text-xs text-muted-foreground">累计课时</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
              <span className="text-lg font-bold">🔥</span>
            </div>
            <div>
              <p className="text-2xl font-bold">{userData.stats.streakDays}</p>
              <p className="text-xs text-muted-foreground">连续学习天数</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>最近学习</CardTitle>
                <CardDescription>你最近在学习的课程</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/courses">
                  全部课程
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              {userData.recentCourses.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground">
                  <BookOpen className="h-10 w-10" />
                  <p>还没有学习记录</p>
                  <Button variant="outline" asChild>
                    <Link href="/courses">开始学习</Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y">
                  {userData.recentCourses.map((course) => (
                    <li key={course.id} className="py-4">
                      <Link
                        href={`/courses/${course.id}`}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-medium">{course.title}</span>
                            {course.completed && <Badge variant="default">已完成</Badge>}
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                              <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="shrink-0 text-xs text-muted-foreground">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>收藏课程</CardTitle>
              <CardDescription>你收藏的课程列表</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="py-6 text-center text-sm text-muted-foreground">
                暂无收藏课程
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>快捷入口</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/ai">
                  <User className="h-4 w-4" />
                  AI 对话
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/ai/generate">
                  <BookOpen className="h-4 w-4" />
                  AI 出题练习
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/video">
                  <Star className="h-4 w-4" />
                  视频专区
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
