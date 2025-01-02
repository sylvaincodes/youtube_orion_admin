"use client";
import Container from "@/components/custom/Container";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Unthaurized() {
  const router = useRouter();

  return (
    <section className="py-40 w-full h-screen">
      <Container>
        <div className="flex flex-col justify-center mt-20">
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-32 ">
              <div className="flex flex-col gap-4 items-center">
                <h1 className="text-[100px] font-bold text-primary-900">
                  Unthorized page
                </h1>
                <p className="text-xl text-slate-700 font-medium">
                  You are not authorized to access this page.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-8 px-80 mt-20">
            <Button
              variant="outline"
              className="text-h4 group-hover:text-primary-900 p-4 flex gap-8 items-center"
              onClick={() => router.back()}
            >
              <MoveLeft
                size={40}
                className="group-hover:text-primary-900 duration-100 ease-linear group-hover:translate-x-2"
              />
              Go Back
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
