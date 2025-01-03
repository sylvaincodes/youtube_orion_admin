"use client";

import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { People } from "@/types";

export default function PeopleJoined({ data }: { data: People[] }) {
  return (
    <div className="flex flex-row justify-center">
      <AnimatedTooltip items={data} />
    </div>
  );
}
