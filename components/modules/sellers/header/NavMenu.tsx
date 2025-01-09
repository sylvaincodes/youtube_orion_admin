"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/custom/MobileNav";
import IconsGroups from "./IconsGroups";

export default function NavMenu({ storeId }: { storeId: string | undefined }) {
  const routes = [
    {
      name: "dashboard",
      link: "/dashboard",
      admin: false,
    },

    {
      name: "products",
      link: "/products",
      admin: false,
    },
    {
      name: "orders",
      link: "/orders",
      admin: false,
    },

    {
      name: "campaigns",
      link: "/campaigns",
      admin: false,
    },
    // {
    //   name: "customers",
    //   link: "/customers",
    //   admin: false,
    // },
    {
      name: "shippings",
      link: "/shippings",
      admin: false,
    },

    {
      name: "withdrawals",
      link: "/withdrawals",
      admin: false,
    },

    //TODO: add analysis content
    // {
    //   name: "analytics",
    //   link: "/analytics",
    //   admin: false,
    // },

    {
      name: "settings",
      link: "/settings",
      admin: false,
    },
  ];

  const pathname = usePathname();

  return (
    <>
      <MobileNav className="lg:hidden ms-auto">
        <ul className="flex flex-col gap-8 items-center justify-center text-heading capitalize">
          <li  className="my-4">
            <IconsGroups />
          </li>

          {routes &&
            routes.map(
              (
                item: { name: string; link: string; admin: boolean },
                idx: number
              ) => (
                <li key={idx} className={cn("flex items-center gap-2")}>
                  <Link
                    className={cn(
                      " hover:text-black dark:hover:text-white dark:text-white",
                      pathname.endsWith(item.link) && "text-black font-bold"
                    )}
                    href={
                      storeId === undefined
                        ? "#"
                        : `/stores/${storeId}${item.link}`
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}

          <li>
            <Button
              asChild
              variant="primary"
              className="border-indigo-500 bg-indigo-500 text-white hover:bg-transparent hover:text-black"
              size="sm"
            >
              <Link href={`/stores/${storeId}/pro`}>Pro</Link>
            </Button>
          </li>
        </ul>
      </MobileNav>
      <nav>
        <ul className="hidden lg:flex  gap-8 items-center justify-center text-heading capitalize">
          {routes &&
            routes.map(
              (
                item: { name: string; link: string; admin: boolean },
                idx: number
              ) => (
                <li key={idx} className={cn("flex items-center gap-2")}>
                  <Link
                    className={cn(
                      " hover:text-black dark:hover:text-white dark:text-white",
                      pathname.endsWith(item.link) && "text-black font-bold"
                    )}
                    href={
                      storeId === undefined
                        ? "#"
                        : `/stores/${storeId}${item.link}`
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              )
            )}

          <li>
            <Button
              asChild
              variant="primary"
              className="border-indigo-500 bg-indigo-500 text-white hover:bg-transparent hover:text-black"
              size="sm"
            >
              <Link href={`/stores/${storeId}/pro`}>Pro</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </>
  );
}
