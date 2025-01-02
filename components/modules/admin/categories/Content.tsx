import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TypeCategoryModel } from "@/types/models";

export default function Content({
  categories,
}: {
  categories: TypeCategoryModel[];
}) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 flex flex-wrap justify-center gap-4">
            {categories &&
              categories.map((item: TypeCategoryModel, idx: number) => (
                <div className="flex flex-col gap-1"  key={idx}>
                  <Link
                    
                    href={`/admin/categories/${item._id}`}
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
                  {/* <AddSub category={item} subcategories={subcategories} /> */}
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
