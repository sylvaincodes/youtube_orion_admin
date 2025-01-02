"use client";
import FixedLeftBar from "./FixedLeftBar";
import React, { useState } from "react";
import MainContent from "./MainContent";
import Row from "@/components/custom/Row";

export default function Docs() {
  const [showContent, setShowContent] = useState("");
  return (
    <Row className="py-10 flex-wrap w-full justify-start items-start">
      <FixedLeftBar setShowContent={setShowContent} />
      <MainContent showContent={showContent} />
    </Row>
  );
}
