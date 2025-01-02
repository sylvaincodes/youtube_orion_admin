import { Loader2 } from "lucide-react";
import React from "react";

export default function Loader() {
  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-center ">
      <div className="" role="status">
        <Loader2 className="text-primary-800 animate-spin outline-4" 
        size={100} />
      </div>
    </div>
  );
}
