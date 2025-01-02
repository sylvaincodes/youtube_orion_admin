"use client";

import React from "react";
import { ClipLoader } from "react-spinners";

export default function Loading({ loading }: { loading: boolean }) {
  return (
    <div>
      {loading ? (
        <ClipLoader
          className="fixed inset-0 m-auto z-50 animate-bounce"
          size={100}
          color="#be3b17"
        />
      ) : (
        ""
      )}
    </div>
  );
}
