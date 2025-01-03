import ThemeToggle from "@/components/custom/ThemeToggle";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import React from "react";

export default function IconsGroups({ className }: { className?: string }) {
  return (
    <div className={cn("relative flex items-center gap-8", className)}>
      <ThemeToggle />
      <div className="flex h-6 w-6">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
