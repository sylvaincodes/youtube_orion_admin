"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TypeSubCategoryModel } from "@/types/models";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Content({ data }: { data: TypeSubCategoryModel[] }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8 flex gap-4 flex-wrap justify-center">
          {data &&
            data.map((item: TypeSubCategoryModel, idx: number) => (
              <Link
                key={idx}
                href={`/admin/subcategories/${item._id}`}
                className="flex flex-col justify-center items-center gap-4 h-[200px] w-[200px]"
              >
                <Image
                  src={item.image}
                  alt="category"
                  width="100"
                  height="100"
                />
                <div className="flex">
                  <h6 className="text-center">{item.name}</h6>
                </div>
              </Link>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
