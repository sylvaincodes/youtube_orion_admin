"use client";
import React from "react";
import { Page, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import useSWR, { Fetcher } from "swr";
import Loading from "@/components/custom/Loading";
import { useAuth } from "@clerk/nextjs";

export default function Pages() {
  const { getToken } = useAuth();
  // fecthing client
  const fetcher: Fetcher<Page[], string> = async (url) => {
    const token = await getToken();
    return await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.data)
      .catch((err) => console.log(err))
      .finally(() => {});
  };

  const { data, isLoading } = useSWR<Page[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/pages",
    fetcher
  );
  if (isLoading) return <Loading loading={true} />;

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data ? data : []} />;
    </>
  );
}
