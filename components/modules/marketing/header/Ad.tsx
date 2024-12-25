"use client";

import Container from "@/components/custom/Container";
import { cn } from "@/lib/utils";
import React from "react";

export default function Ad({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-pink-700 to-secondary-500 h-[31.5px]",
        className
      )}
    >
      <Container>
        <div className="flex justify-center">
          <p className="text-white text-base tracking-wider font-normal">
            Introducing<strong className="mx-2">Bolcom</strong>
            Full Multi-vendor online store for selling everyhting with plugins
            integrated
          </p>
        </div>
      </Container>
    </div>
  );
}
