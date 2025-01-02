"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";
import React from "react";


export type Order = {
  _id: string;
  name: string;
  createdAt: string;
  status: string;
};

export const columns: ColumnDef<Order>[] = [

  {
    accessorKey: "_id",
    header: "ID",
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
    cell: ({ row }) => <CellAction data={row.original}  />,
  },
];
