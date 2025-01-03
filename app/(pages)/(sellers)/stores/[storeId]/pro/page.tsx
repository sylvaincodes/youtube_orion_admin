import { Hero } from "@/components/modules/pro/Hero";
import { Metadata } from "next";
import React from "react";

export const revalidate = 3600;

export default function page() {

  return <Hero />;
}

export const metadata: Metadata = {
  title: "Updgrade Pro - Orion - Ecommerce",
  description:
    "A Ecommerce app. We are selling everything, shoes for mens womens and kids",
  icons: {
    icon: "/assets/images/logo_dark.svg",
  },
};
