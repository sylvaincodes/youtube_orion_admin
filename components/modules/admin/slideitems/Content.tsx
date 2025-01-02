import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TypeSubCategoryModel } from "@/types/models";

export default function Content({ data }: { data: TypeSubCategoryModel[] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 flex flex-wrap lg:flex-nowrap justify-center gap-4">
            {data &&
              data.map((item: TypeSubCategoryModel, idx: number) => (
                <Link
                  key={idx}
                  href={`/admin/slideitems/${item._id}`}
                  className="flex flex-col justify-center items-center gap-4 rounded-md w-[200px] h-[200px] hover:border"
                >
                  <Image
                    src={item.image}
                    width="100"
                    height="100"
                    alt="category"
                  />
                  <div className="flex">
                    <h6> {item.name.substring(0, 15)}</h6>
                  </div>
                </Link>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
