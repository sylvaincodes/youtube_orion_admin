"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import { Image as TypeImage } from "@/types/models";

export type Product = {
  _id: string;
  images: TypeImage[];
  name: string;
  createdAt: string;
  status: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      return (
        <Image
          src={
              row.original.images.length >0
              ? row.original.images[0].url
              : "https://res.cloudinary.com/didbxg1f9/image/upload/v1726696994/pgno7dufkcmvuwygtraf.png"
          }
          alt="image"
          width="30"
          height="30"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const formatted = format(row.getValue("createdAt"), "MMMM do, yyyy");
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
