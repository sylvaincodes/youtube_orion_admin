"use client";
import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CreditCard,
  Share2,
  TabletSmartphone,
  Truck,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import  PeopleJoined  from "../../../custom/PeopleJoined";
import { people } from "@/constants";
import { useAuth } from "@clerk/nextjs";

export function BentoGrid() {
  const { userId } = useAuth();
  return (
    <div className="h-full flex-1 w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative ">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Container>
        <div className="flex flex-col justify-center items-center pt-20 gap-8">
          <Row className="justify-between">
            <Badge className="z-10 m-w-[320px] flex bg-neutral-200 hover:bg-white justify-between items-center text-sm text-black border hover:border-border shadow-lg hover:cursor-pointer font-bold gap-12  px-4 dark:bg-neutral-800 dark:border-border dark:text-slate-200 dark:hover:bg-neutral-800">
              Introducing Orion Ecommerce
              <ChevronRight size="14" />
            </Badge>
          </Row>

          <h1 className="text-black text-2xl/8 lg:text-5xl/8 text-center">
            Launch your &nbsp;
            <strong className="text-primary-500 font-extrabold">
              online store &nbsp;
            </strong>
            quickly
          </h1>
          <h6 className="font-normal text-pretty text-center max-w-screen-xl text-base lg:text-xl">
            Simplify your online marketplace operations with Orion. Perfect for
            seamless management and effortless scaling, Orion is the ultimate
            multi vendor ecommerce build with NextJs.
          </h6>

          <div className="flex gap-4 mt-10">
            <Button
              variant="default"
              className="p-8 text-xl rounded-2xl z-10 hover:shadow-2xl font-normal"
            >
              <Link href={userId ? "/stores" : "/sign-in"}>
                {userId ? "Dashboard" : "Join for free"}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="p-8 text-xl rounded-2xl z-10 hover:shadow-2xl hover:bg-white"
            >
              <Link
                href="https://www.youtube.com/@sylvaincodes593"
                target="_blank"
              >
                See the demo
              </Link>
            </Button>
          </div>
          <div className="z-10">
            <ul className="flex flex-wrap gap-8 items-center dark:text-heading">
              <li className="group flex items-center gap-4 ">
                <TabletSmartphone className="" />
                <span className="">Responsive</span>
              </li>
              <li className="group flex items-center gap-4">
                <CreditCard className="" />
                <span>Integrated payment</span>
              </li>
              <li className="group flex items-center gap-4">
                <Truck className="" />
                <span>Order tracking</span>
              </li>
              <li className="group flex items-center gap-4">
                <Share2 className="" />
                <span>Marketing - Seo Optimized</span>
              </li>
            </ul>
          </div>
          <div className="flex-col gap-12 items-center mt-10">
            <h6 className="mb-4">
              A lot of users are using ORION to grow their stores, join the
              community.
            </h6>
            <PeopleJoined data={people} />
          </div>
        </div>
      </Container>
    </div>
  );
}
