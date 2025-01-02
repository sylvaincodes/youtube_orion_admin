"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { format } from "date-fns";
import React from "react";
import { TypeStoreModel } from "@/types/models";

export type Subscription = {
  _id: string;
  store: TypeStoreModel;
  type: string;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">{row.getValue("type")}</div>
      );
    },
  },
  {
    accessorKey: "store",
    header: "Store",
    cell: ({ row }) => {
      const store: TypeStoreModel = row.getValue("store");
      return <div className="font-medium capitalize">{store.name}</div>;
    },
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
