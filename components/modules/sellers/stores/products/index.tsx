"use client";
import React from "react";
import { Product, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Loading from "@/components/custom/Loading";
import { useAuth } from "@clerk/nextjs";

export default function Products({ storeId }: { storeId: string }) {
  const { getToken } = useAuth();
  // fecthing
  const fetcher: Fetcher<Product[], string> = async (url) => {
    const token = await getToken();
    return await axios
      .get(url, {
        params: { storeId: storeId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  const { data, isLoading } = useSWR<Product[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/products?storeId=" + storeId,
    fetcher
  );
  if (isLoading) return <Loading loading={true} />;
  return (
    <DataTable searchKey="name" columns={columns} data={data ? data : []} />
  );
}
