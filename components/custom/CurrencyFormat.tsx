import { cn } from "@/lib/utils";
import React from "react";
import { NumericFormat } from "react-number-format";

export default function CurrencyFormat({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <NumericFormat
      className={cn(
        "tracking-wider text-xl font-normal inline-flex max-w-[160px] outline-none dark:bg-transparent",
        className
      )}
      prefix="$"
      value={value}
      decimalScale={3}
      thousandSeparator=","
      decimalSeparator="."
    />
  );
}
