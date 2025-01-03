"use client";
import { TypeSlideItemModel } from "@/types/models";
import React, { useState } from "react";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@mui/material";
import Content from "./Content";
import Loading from "@/components/custom/Loading";
import useSWR, { Fetcher } from "swr";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

export default function Campaigns({ storeId }: { storeId: string }) {
  const { getToken } = useAuth();
  // fecthing
  const fetcher: Fetcher<TypeSlideItemModel[], string> = async (url) => {
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

  const { data, isLoading } = useSWR<TypeSlideItemModel[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/campaigns?storeId=" + storeId,
    fetcher
  );
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(data ? data.length / PER_PAGE : 1);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (isLoading) return <Loading loading={true} />;

  return (
    <div className="flex flex-col gap-8">
      <Content data={_DATA.currentData()} storeId={storeId} />

      <div className="flex w-full">
        <Pagination
          count={count}
          page={page}
          color="primary"
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
