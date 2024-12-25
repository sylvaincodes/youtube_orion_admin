"use client";

import Container from "@/components/custom/Container";
import PeopleJoined from "@/components/custom/PeopleJoined";
import Row from "@/components/custom/Row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { people } from "@/constants";
import { useAuth } from "@clerk/nextjs";
import { ChevronRight, TabletSmartphone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function BentoGrid() {
  const { userId } = useAuth();
  return (
    <div className="h-full flex-1 bg-white   bg-grid-black/[0.1] relative ">
      {/* bento component  */}
      <div className="absolute inset-0 flex justify-center items-center   pointer-events-none bg-white   [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* content  */}
      <Container>
        <div className="flex flex-col justify-center items-center pt-20 gap-8">
          <Row className="justify-between">
            <Badge className="z-10 m-w-[320px] bg-neutral-200 flex items-center justify-between font-bold text-black shadow-lg text-sm gap-12 hover:bg-white cursor-pointer px-4 ">
              Introducing Bolcom ecommerce
              <ChevronRight size={14} />
            </Badge>
          </Row>

          <h1 className="text-black text-2xl/8 text-center lg:text-5xl/8">
            Launch your{" "}
            <strong className="text-primary-500 font-extrabold ">
              online store{" "}
            </strong>{" "}
            quickly
          </h1>

          <h6 className="text-pretty text-center max-w-screen-xl text-base font-normal lg:text-xl">
            Simplify your online marketplace operations with Bolcom. Perfect for
            seamless management and effortless scaling, Bolcom is the ultimate
            multi vendor ecommerce build with NextJs.
          </h6>

          <div className="flex gap-4 mt-10">
            <Button
              variant="default"
              className="text-xl p-8 rounded-2xl hover:shadow-2xl font-normal z-10"
            >
              <Link href={userId ? ".stores" : "sign-in"}>
                {userId ? "dashboard" : "Join fo free"}
              </Link>
            </Button>

            <Button
              variant="outline"
              className="text-xl p-8 rounded-2xl hover:shadow-2xl font-normal z-10 border-none"
            >
              see the demo{" "}
            </Button>
          </div>

          <div className="z-10">
            <ul className="flex flex-wrap gap-8 items-center text-sm">
              <li className="flex gap-4 items-center">
                <TabletSmartphone />
                <span>Responsive</span>
              </li>
              <li className="flex gap-4 items-center">
                <TabletSmartphone />
                <span>Integrated payment</span>
              </li>
              <li className="flex gap-4 items-center">
                <TabletSmartphone />
                <span>Order tracking</span>
              </li>
              <li className="flex gap-4 items-center">
                <TabletSmartphone />
                <span>Marketing - Seo Optimized</span>
              </li>
            </ul>
          </div>

          <div className="mt-10 flex flex-col justify-center items-center gap-4">
            <h6 className="text-center">
              A lot of users are using Bolcom to grow their stores, join the
              community.
            </h6>
            <PeopleJoined data={people} />
          </div>
        </div>
      </Container>
    </div>
  );
}
