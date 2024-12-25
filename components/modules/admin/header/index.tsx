"use client";

import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import React from "react";
import NavMenu from "./NavMenu";
import IconsGroups from "./IconsGroups";

export default function Header() {
  return (
    <header className="h-[80px] border-b border-border">
      <Container>
        <Row className="">
          <NavMenu  />
          <IconsGroups className="ms-auto" />
        </Row>
      </Container>
    </header>
  );
}
