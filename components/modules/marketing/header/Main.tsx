"use client";

import Container from "@/components/custom/Container";
import Logo from "@/components/custom/Logo";
import Row from "@/components/custom/Row";
import React from "react";
import SocialMedia from "./SocialMedia";
import MobileNav from "./MobileNav";
import Nav from "./Nav";

export default function Main() {
  return (
    <div className="h-[80px]">
      <Container>
        <Row className="gap-32">
          <Logo />
          <Nav className="hidden lg:flex" />
          <MobileNav className="lg:hidden ms-auto"/>
          <SocialMedia className="hidden lg:flex ms-auto" />
        </Row>
      </Container>
    </div>
  );
}
