import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CourseCard } from "@/components/shared/course-card";
import type { Course } from "@/types";

interface CourseSectionProps {
  courses: Course[];
  title?: string;
  description?: string;
}

export function CourseSection({
  courses,
  title = "精选课程",
  description = "由行业专家打造，覆盖 AI 核心技术与实战应用",
}: CourseSectionProps) {
  return (
    <section className="container py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        <Link
          href="/courses"
          className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 sm:inline-flex"
        >
          查看全部
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
