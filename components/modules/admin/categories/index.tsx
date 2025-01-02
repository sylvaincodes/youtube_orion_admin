"use client";
import { TypeCategoryModel } from "@/types/models";
import React, { useState } from "react";
import Content from "./Content";
import usePagination from "@/hooks/usePagination";
import { Pagination } from "@mui/material";
import useSWR, { Fetcher } from "swr";
import axios from "axios";
import Loading from "@/components/custom/Loading";
import { useAuth } from "@clerk/nextjs";

export default function Categories() {
  const { getToken } = useAuth();
  // fecthing client
  const fetcher: Fetcher<TypeCategoryModel[], string> = async (url) => {
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

  const { data, isLoading } = useSWR<TypeCategoryModel[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories",
    fetcher
  );

  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(data ? data.length / PER_PAGE : 0);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };

  if (isLoading) return <Loading loading={true} />;

  return (
    <div className="flex flex-col gap-8">
      <Content categories={_DATA.currentData()} />

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
