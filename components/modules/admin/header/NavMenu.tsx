"use client";

import MobileNav from "@/components/custom/MobileNav";
import { routes } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <>
      <MobileNav className="lg:hidden">
        <ul className=" flex flex-col gap-8 items-center">
          {routes &&
            routes.map((item: { name: string; link: string }, idx: number) => (
              <li className="" key={idx}>
                <Link
                  href={item.link}
                  className={cn(
                    " hover:text-black capitalize",
                    pathname.endsWith(item.link) && "font-bold text-black"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </MobileNav>

      {/* nav for desktop  */}
      <nav>
        <ul className="hidden lg:flex items-center gap-8 justify-center text-heading capitalize">
          {routes &&
            routes.map((item: { name: string; link: string }, idx: number) => (
              <li className="" key={idx}>
                <Link
                  href={item.link}
                  className={cn(
                    " hover:text-black capitalize",
                    pathname.endsWith(item.link) && "font-bold text-black dark:text-white"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </nav>
    </>
  );
}
