"use client";

import Row from "@/components/custom/Row";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export default function Nav({ className }: { className?: string }) {
  return (
    <Row className={cn("", className)}>
      <ul className="flex items-center h-full gap-12 text-heading text-base">
        <li>
          <Link className="hover:text-slate-700" href="/docs">
            Docs
          </Link>
        </li>
        <li>
          <Link className="hover:text-slate-700" href="/pricing">
            Pricing
          </Link>
        </li>
      </ul>
    </Row>
  );
}
