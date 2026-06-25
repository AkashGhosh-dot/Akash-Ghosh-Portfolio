import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "blue" | "purple" | "green" | "muted";
  className?: string;
}

const variantStyles = {
  blue: "bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/30",
  purple: "bg-[#7B72E1]/10 text-[#A78BFA] border-[#7B72E1]/30",
  green: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30",
  muted: "bg-white/5 text-[#9CA3AF] border-white/10",
};

export default function Tag({ children, variant = "blue", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
