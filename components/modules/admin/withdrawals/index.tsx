"use client";
import React from "react";
import { Withdrawl, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import useSWR, { Fetcher } from "swr";
import Loading from "@/components/custom/Loading";
import { useAuth } from "@clerk/nextjs";

export default function Withdrawals() {
  // fecthing client
  const { getToken } = useAuth();
  const fetcher: Fetcher<Withdrawl[], string> = async (url: string) => {
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

  const { data, isLoading } = useSWR<Withdrawl[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/withdrawals",
    fetcher
  );
  if (isLoading) return <Loading loading={true} />;

  return (
    <>
      <DataTable searchKey="status" columns={columns} data={data ? data : []} />;
    </>
  );
}
