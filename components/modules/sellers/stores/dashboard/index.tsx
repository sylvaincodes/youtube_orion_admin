"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChartColumn, DollarSign, Package } from "lucide-react";
import CurrencyFormat from "@/components/custom/CurrencyFormat";
import { TypeOrderItemModel, TypeProductModel } from "@/types/models";
import axios from "axios";
import Loading from "@/components/custom/Loading";
import { useAuth } from "@clerk/nextjs";

export default function Dashboard({ storeId }: { storeId: string }) {
  const [products, setProducts] = useState<TypeProductModel[]>();
  const [sales, setSales] = useState<TypeOrderItemModel[]>();
  const [earnings, setEarnings] = useState<number>(0);
  const [isLoading, setLoading] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const token = await getToken();

      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/user/products", {
          params: { storeId: storeId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();

    const getSales = async () => {
      setLoading(true);
      const token = await getToken();

      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/user/orderitems", {
          params: { storeId: storeId, action: "earning" },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSales(response.data.data);
          const _earnings = response.data.data.reduce(
            (total: number, currentValue: TypeOrderItemModel) =>
              total + currentValue.earning,
            0
          );
          setEarnings(_earnings);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getProducts();
    getSales();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4">
        <Heading
          name="dashboard"
          description="overview of your store details"
        />
        <Separator />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-thin text-heading">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-6 h-6 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              <CurrencyFormat className="font-bold text-3xl" value={earnings} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-thin text-heading">
              Total Products
            </CardTitle>
            <Package className="w-6 h-6 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{products?.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xl font-thin text-heading">
              Total sales
            </CardTitle>
            <ChartColumn className="w-6 h-6 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{sales?.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
