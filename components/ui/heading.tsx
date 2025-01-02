import React from "react";

export default function Heading({
  name,
  description,
}: {
  name?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <h6 className="text-h4 lg:text-h3">{name}</h6>
      </div>
      <p className="text-heading">{description}</p>
    </div>
  );
}
