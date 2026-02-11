"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface CounterStatProps {
  value: number;
  suffix?: string;
  delay?: number;
}

export function CounterStat({ value, suffix = "", delay = 0 }: CounterStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  const formatted = count >= 1000
    ? `${(count / 1000).toFixed(count >= value ? 0 : 0)}${count >= 1000 ? "." + String(count % 1000).padStart(3, "0").slice(0, -2) : ""}`.replace(/\.0+$/, "").replace(/(\.\d)0$/, "$1")
    : String(count);

  const display = count >= 1000
    ? new Intl.NumberFormat("tr-TR").format(count)
    : String(count);

  return (
    <motion.span
      ref={ref}
      className="text-3xl sm:text-4xl lg:text-5xl font-black text-gradient-gold inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {display}{suffix}
    </motion.span>
  );
}
