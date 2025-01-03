"use client";
import * as React from "react";
import Heading from "@/components/custom/Heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypeStoreModel, TypeSubscriptionModel } from "@/types/models";
import { ChartColumn, DollarSign, Package } from "lucide-react";

export default function Dashboard({
  earnings,
  sellers,
  members,
}: {
  earnings: number;
  sellers: TypeStoreModel[];
  members: TypeSubscriptionModel[];
}) {
  return (
    <div className="flex flex-col h-screen">
      {/* heading  */}
      <div className="flex flex-col gap-4">
        <Heading
          name="dashboard"
          description="overview of your admin details"
        />
        <Separator />
      </div>

      {/* cards  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <CardTitle className="text-xl font-thin text-heading">
              Total stores
            </CardTitle>
            <ChartColumn className="h-6 w-6 font-bold" />
          </CardHeader>

          <CardContent>
            <div className="flex text-3xl font-bold">
              {sellers ? sellers.length : 0}
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <CardTitle className="text-xl font-thin text-heading">
              Total Members
            </CardTitle>
            <Package className="h-6 w-6 font-bold" />
          </CardHeader>

          <CardContent>
            <div className="flex text-3xl font-bold">
              {members ? members.length : 0}
            </div>
          </CardContent>
        </Card>

        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
            <CardTitle className="text-xl font-thin text-heading">
              Total Earning
            </CardTitle>
            <DollarSign className="h-6 w-6 font-bold" />
          </CardHeader>

          <CardContent>
            <div className="flex text-3xl font-bold">
              {earnings ? earnings : 0}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
