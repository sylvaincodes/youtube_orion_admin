"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  const { theme } = useTheme();
  return (
    <Link href="/" className="flex items-center gap-4">
      <Image
        src={
          theme === "dark"
            ? "/assets/images/bolcom_light.svg"
            : "/assets/images/bolcom.svg"
        }
        alt="logo"
        width="30"
        height="30"
      />
      <h4 className={cn("text-black")}>bolcom</h4>
    </Link>
  );
}
