"use client";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedSection({
  children,
  className,
}: AnimatedSectionProps) {
  return <section className={className}>{children}</section>;
}
