import { cn } from "@/lib/utils";

// ============================================================
// Section wrapper — consistent spacing, optional bg variants
// ============================================================

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "muted" | "brand";
}

export function SectionWrapper({
  children,
  className,
  id,
  variant = "default",
}: SectionWrapperProps) {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-surface-sunken",
    brand: "bg-brand text-white",
  };

  return (
    <section
      id={id}
      className={cn("py-20 md:py-28 lg:py-32", bgClasses[variant], className)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
