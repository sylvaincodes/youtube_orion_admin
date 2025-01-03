"use client";
import Container from "@/components/custom/Container";
import  PeopleJoined  from "@/components/custom/PeopleJoined";
import PricingCard from "@/components/custom/PricingCard";
import Row from "@/components/custom/Row";
import { Badge } from "@/components/ui/badge";
import { people, subscriptionPlan } from "@/constants";
import { TypeSubscriptionPlan } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Hero() {
  return (
    <div
      className="h-full pb-20 flex-1 w-full dark:bg-black 
    bg-white dark:bg-grid-white/[0.1] bg-dot-black/[0.4] relative "
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <Container>
        <div className="flex flex-col justify-center items-center pt-20 gap-8">
          <Row className="justify-between">
            <Badge className="z-50 m-w-[320px] flex bg-neutral-200 hover:bg-white justify-between items-center text-sm text-black border hover:border-border shadow-lg hover:cursor-pointer font-bold gap-12  px-4 dark:bg-neutral-800 dark:border-border dark:text-slate-200 dark:hover:bg-neutral-800">
              Pricing
              <ChevronRight size="14" />
            </Badge>
          </Row>

          <h1 className="text-3xl xl:text-h1 text-black z-50 text-center">
            grow your store rapidly with
            <strong className="uppercase text-white bg-indigo-600 rounded-xl font-extrabold dark:text-white px-6 ms-4 py-0">
              pro
            </strong>
          </h1>

          <div
            id="mega-menu-full-dropdown"
            className=" dark:bg-gray-800 dark:border-gray-600"
          >
            <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:px-6">
              <ul>
                <li>
                  <Link
                    href="#"
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="font-semibold capitalize">
                      Publish campaigns
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Create and publish campaigns on the market to promote your
                      products.
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="font-semibold capitalize">
                      Multiple store
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Create and manage multiple store and grow your busness.
                    </span>
                  </Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link
                    href="#"
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="font-semibold capitalize">
                      report and data analysis
                      <Badge className="text-sm" variant="green">
                        Coming up
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Get data to manage customer behaviours so that you can
                      adjust their needs.
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="#"
                    className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="font-semibold capitalize">
                      Email Marketing
                      <Badge className="text-sm" variant="green">
                        Coming up
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Promote your product through emailing which allows
                      customers on your mailing list to be informed about new
                      products.
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-col gap-12 items-center mt-10">
            <h6 className="mb-4">
              A lot of users are using ORION to grow their stores, join the
              community.
            </h6>
            <PeopleJoined data={people} />
          </div>
          <Row className="gap-12 flex-wrap lg:flex-nowrap">
            {subscriptionPlan.map((item: TypeSubscriptionPlan, idx: number) => (
              <PricingCard data={item} key={idx} />
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
}
