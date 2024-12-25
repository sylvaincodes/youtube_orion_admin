"use client";

import ThemeToggle from "@/components/custom/ThemeToggle";
import { cn } from "@/lib/utils";
import { LucideGithub, Youtube } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SocialMedia({ className }: { className?: string }) {
  return (
    <div className={cn("", className)}>
      <ul className="flex items-center gap-12 text-heading text-base capitalize">
        <li className="">
          <Link
            href="/"
            className="flex gap-4 items-center hover:text-primary-700"
          >
            <Youtube />
            youtube
          </Link>
        </li>
        <li className="">
          <Link
            href="/"
            className="flex gap-4 items-center hover:text-primary-700"
          >
            <LucideGithub />
            github
          </Link>
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
}
