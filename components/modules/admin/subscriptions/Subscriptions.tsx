"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Loading from "@/components/custom/Loading";
import {
  TypePaymentModel,
  TypeStoreModel,
  TypeSubscriptionModel,
} from "@/types/models";
import { format } from "date-fns";
import { useAuth } from "@clerk/nextjs";

export default function Subscriptions({ _id }: { _id?: string }) {
  // 1. set state
  const [isLoading, setLoading] = useState(false);
  const [subscription, setData] = useState<TypeSubscriptionModel>();
  const [store, setStore] = useState<TypeStoreModel>();
  const [payments, setPayments] = useState<TypePaymentModel[]>();
  const { getToken } = useAuth();

  // 5. Reset form default values if edit
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = await getToken();

      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/subscriptions", {
          params: { _id: _id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.data);
          setStore(response.data.data.store);
          setPayments(response.data.data.payments);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    if (_id) {
        getData();
      }
  }, []);

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name={`subscription - ${store?.name.substring(0, 15)}`}
            description="Here is summary for subscription"
          />
          <Link
            href="/admin/subscriptions"
            className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
          >
            <ChevronLeft className="me-1" />
            Go to list
          </Link>
        </div>
        <Separator />
      </div>
      <div>
        <div className="space-y-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-12 my-8">
            <div className="flex flex-col gap-4 col-span-2">
              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">Store</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col gap-8">
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between">
                      <h6>name</h6> <strong>{store?.name}</strong>
                    </li>

                    <li className="flex justify-between">
                      <h6>Created at </h6>
                      <strong>
                        {store && format(store.createdAt, "MMMM do, yyyy")}
                      </strong>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">
                    Active Subscription
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col gap-8">
                  <ul className="flex flex-col gap-4">
                    <li className="flex justify-between">
                      <h6>name</h6> <strong>{store?.name}</strong>
                    </li>
                    <li className="flex justify-between">
                      <h6>status</h6> <strong>{subscription?.status}</strong>
                    </li>
                    <li className="flex justify-between">
                      <h6>type</h6> <strong>{subscription?.type}</strong>
                    </li>
                    <li className="flex justify-between">
                      <h6>End to</h6>
                      <strong>
                        {subscription &&
                          subscription.endDate &&
                          format(subscription.endDate, "MMMM do, yyyy")}
                      </strong>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">Last payments</CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <ul className="flex flex-col gap-4">
                    {payments &&
                      payments.map((item: TypePaymentModel, idx: number) => (
                        <li className="flex justify-between" key={idx}>
                          <Link
                            href={`/admin/payments/${item._id}`}
                            className="text-indigo font-bold"
                          >
                            <h6>#</h6> <strong>{item?._id}</strong>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">Status*</CardTitle>
                </CardHeader>
                <CardContent className="py-10"></CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
