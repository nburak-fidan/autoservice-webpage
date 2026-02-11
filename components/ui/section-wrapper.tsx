import { cn } from "@/lib/utils";

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
    muted: "bg-[#0e0e0e]",
    brand: "bg-brand text-black",
  };

  return (
    <section
      id={id}
      className={cn("relative py-20 md:py-28 lg:py-32 overflow-hidden", bgClasses[variant], className)}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
