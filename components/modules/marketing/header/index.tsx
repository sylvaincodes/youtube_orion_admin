"use client";

import React from "react";
import Ad from "./Ad";
import Main from "./Main";

export default function Header() {
  return (
    <header>
      <Ad className="hidden lg:flex" />
      <Main />
    </header>
  );
}
