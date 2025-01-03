"use client";

import React, { useState } from "react";
import Content from "./Content";
import { Pagination } from "@mui/material";
import usePagination from "@/hooks/usePagination";
import { useAuth } from "@clerk/nextjs";
import { TypeSubCategoryModel } from "@/types/models";
import useSWR, { Fetcher } from "swr";
import axios from "axios";

export default function Subcategories() {
  // data fetching
  const { getToken } = useAuth();

  const fetcher: Fetcher<TypeSubCategoryModel[], string> = async (url) => {
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

  const { data } = useSWR<TypeSubCategoryModel[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/subcategories",
    fetcher
  );

  //pagination  logic
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;
  const count = Math.ceil(data ? data.length / PER_PAGE : 1);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e: React.ChangeEvent<unknown>, p: number) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <div className="flex flex-col gap-8">
      <Content data={_DATA.currentData()} />
      <div>
        <Pagination
          count={count}
          page={page}
          color="standard"
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
