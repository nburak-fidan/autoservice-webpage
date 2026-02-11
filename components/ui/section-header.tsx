import { cn } from "@/lib/utils";
import { ScrollReveal } from "./scroll-reveal";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={cn("mb-12 md:mb-16", className)}>
      <div
        className={cn(
          align === "center" && "text-center mx-auto max-w-2xl",
          align === "left" && "max-w-2xl"
        )}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-brand" />
          <span className="text-brand text-sm font-bold uppercase tracking-widest">
            {title}
          </span>
          <span className="h-px w-8 bg-brand" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
