"use client";
import Container from "@/components/custom/Container";
import Row from "@/components/custom/Row";
import React from "react";
import NavMenu from "./NavMenu";
import IconsGroups from "./IconsGroups";
import StoreModal from "./StoreModal";

export default function Header({ storeId }: { storeId?: string }) {
  return (
    <header className="h-[80px] z-10 border-b border-border ">
      <Container>
        <Row className="gap-4 relative">
          <StoreModal storeId={storeId} />
          <NavMenu storeId={storeId} />
          <IconsGroups className="ms-auto" />
        </Row>
      </Container>
    </header>
  );
}
