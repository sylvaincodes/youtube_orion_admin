import Switch from "./Switch";
import React from "react";

export default function Informations({ check }: { check: boolean }) {
  return (
    <>
      <Switch check={check} />
    </>
  );
}
