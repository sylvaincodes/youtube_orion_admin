"use client";

import Heading from "@/components/custom/Heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Informations from "./Informations";

export default function Settings({ check }: { check: boolean }) {
  return (
    <div>
      {/* heading  */}
      <div className="flex flex-col gap-4">
        <Heading name="settings" description="customize your store" />

        <Tabs>
          <TabsList>
            <TabsTrigger value="account">Informations</TabsTrigger>
          </TabsList>
          <TabsContent
            value="account"
            className="w-full grid grid-cols-1 lg:grid-cols-4  gap-4"
          >
            <Informations check={check} />
          </TabsContent>
        </Tabs>
        <Separator />
      </div>
    </div>
  );
}
