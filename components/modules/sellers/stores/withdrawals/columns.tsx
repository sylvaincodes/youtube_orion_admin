"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";
import React from "react";

export type Withdrawl = {
  _id: string;
  amount: string;
  image: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<Withdrawl>[] = [
  {
    accessorKey: "amount",
    header: "Amount",
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
