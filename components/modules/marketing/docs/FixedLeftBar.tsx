import React from "react";

export default function page({
  setShowContent,
}: {
  setShowContent: (v: string) => void;
}) {
  return (
    <div className="overflow-y-auto min-w-60 h-[790px] hidden lg:flex">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h6 className="font-bold cursor-pointer tracking-wider">
            Getting started
          </h6>
          <h6
            onClick={() => setShowContent("introduction")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Introduction
          </h6>
          <h6
            onClick={() => setShowContent("features")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Key features
          </h6>
          <h6
            onClick={() => setShowContent("installation")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Installation
          </h6>
          {/* <h6
            onClick={() => setShowContent("configuration")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Configuration
          </h6> */}
        </div>
      </div>
    </div>
  );
}
