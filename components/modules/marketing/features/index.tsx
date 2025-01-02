"use client";
import FixedLeftBar from "./FixedLeftBar";
import React, { useState } from "react";
import MainContent from "./MainContent";
import Row from "@/components/custom/Row";

export default function Features() {
  const [showContent, setShowContent] = useState("stripe");
  return (
    <Row className="py-10 flex-wrap">
      <FixedLeftBar setShowContent={setShowContent} />
      <MainContent showContent={showContent} />
    </Row>
  );
}
