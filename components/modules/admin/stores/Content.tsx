import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { TypeStoreModel } from "@/types/models";
import { cn } from "@/lib/utils";

export default function Content({ stores }: { stores: TypeStoreModel[] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        <Card className="bg-white shadow-lg">
          <CardContent className="p-8 flex flex-wrap lg:flex-nowrap justify-center gap-4">
            {stores &&
              stores.map((item: TypeStoreModel, idx: number) => (
                <div className="flex flex-col gap-1" key={idx}>
                  <Link
                    key={idx}
                    href={`/admin/stores/${item._id}`}
                    className="relative flex flex-col justify-center items-center gap-4 rounded-md w-[200px] h-[200px] hover:border"
                  >
                    <Image
                      src={item.logo}
                      width="100"
                      height="100"
                      alt="category"
                    />
                    <div className="flex">
                      <h6> {item.name.substring(0, 15)}</h6>
                    </div>

                    <div
                      className={cn(
                        "absolute w-4 h-4 top-8 right-12 rounded-full",
                        item.status === "online" ? "bg-green-400" : ""
                      )}
                    ></div>
                  </Link>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
