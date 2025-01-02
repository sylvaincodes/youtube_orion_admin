"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { statusValidationSchema } from "@/types/schemas";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { TypeOrderItemModel } from "@/types/models";
import Link from "next/link";
import { ChevronRight, Loader2Icon } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, discountPrice } from "@/lib/utils";
import "react-medium-image-zoom/dist/styles.css";
import { orderStatus, trackingStatus } from "@/constants";
import { addDays } from "date-fns";
import Image from "next/image";

export default function OrderForm({ order }: { order: TypeOrderItemModel }) {
  const { getToken } = useAuth();
  async function putRequest(url: string, { arg }: { arg: { status: string } }) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: { _id: order._id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const data = response.data;
        toast({
          variant: "default",
          title: "Well done",
          description: data.message,
        });
      })
      .catch((err) => {
        toast({
          variant: "default",
          title: "OOps ❌",
          description: err.message,
        });
        console.log(err.message);
      })
      .finally(() => {});
  }

  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/user/orderitems",
    putRequest /* options */
  );

  const form = useForm<z.infer<typeof statusValidationSchema>>({
    resolver: zodResolver(statusValidationSchema),
    defaultValues: { status: order.status },
  });

  const onSubmit = async (values: z.infer<typeof statusValidationSchema>) => {
    const data = {
      status: values.status,
    };
    await update(data);
  };

  const updateTrackOrder = async (e: string) => {
    const token = await getToken();
    await axios
      .put(
        process.env.NEXT_PUBLIC_API_URL + "/api/user/trackorders",
        { status: e },
        {
          params: { _id: order.trackorder._id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data;
        toast({
          variant: "default",
          title: "Well done",
          description: data.message,
        });
      });
  };

  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name="Manage order"
            description="Here is order detail for your customer."
          />
          <Link
            href={`/stores/${order.store._id}/orders`}
            className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
          >
            Go to list
            <ChevronRight className="me-1" />
          </Link>
        </div>
        <Separator />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-12 my-8">
            <div className="col-span-2 space-y-4">
              <div className="flex flex-col gap-4 col-span-2">
                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">Date</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4  w-full overflow-x-auto">
                    <ul className="flex gap-10 flex-wrap lg:flex-nowrap">
                      <li className="flex gap-4">
                        <span className="font-bold">Created At:</span>{" "}
                        <span>
                          {order.createdAt.toString().substring(0, 10)}
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <span className="font-bold">Order id:</span>{" "}
                        <span>{order._id}</span>
                      </li>

                      <li className="flex gap-4">
                        <span className="font-bold">Estimate delivery:</span>{" "}
                        <span>
                          {addDays(
                            new Date(order.createdAt),
                            order.shipping.delay
                          ).toString()}
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">
                      {" "}
                      Delivery Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-4 w-full overflow-x-auto">
                    <ul className="flex gap-y-4 gap-x-10 flex-wrap lg:flex-wrap">
                      <li className="flex gap-4">
                        <span className="font-bold">Country:</span>{" "}
                        <span>{order.address.country} </span>
                      </li>

                      <li className="flex gap-4">
                        <span className="font-bold">City:</span>{" "}
                        <span>{order.address.city} </span>
                      </li>

                      <li className="flex gap-4">
                        <span className="font-bold">Name:</span>{" "}
                        <span>
                          {order.address.firstName} {order.address.lastName}
                        </span>
                      </li>
                      <li className="flex gap-4">
                        <span className="font-bold">Phone:</span>{" "}
                        <span>{order.address.phone}</span>
                      </li>

                      <li className="flex gap-4">
                        <span className="font-bold">Email:</span>{" "}
                        <span>{order.address.email}</span>
                      </li>

                      <li className="flex gap-4">
                        <span className="font-bold">Address:</span>{" "}
                        <span>{order.address.address}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                {/* <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">Customer</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4  w-full overflow-x-auto">
                    <ul className="flex gap-10 flex-wrap lg:flex-nowrap">
                      <li className="flex gap-4">
                        <span className="font-bold">~ID:</span>{" "}
                        <Link
                          href={`/stores/${order.store._id}/customers/${order.order.customer}`}
                        >
                          View customer
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card> */}

                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">
                      Payment details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-4  w-full overflow-x-auto">
                    <ul className="flex gap-10 flex-wrap lg:flex-nowrap">
                      <li className="flex gap-4">
                        <span className="font-bold">Paid with:</span>{" "}
                        <span>{order.order.pmethod.name}</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">Items</CardTitle>
                  </CardHeader>
                  <CardContent className="py-4  w-full overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Image</TableHead>
                          <TableHead>Qty</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Discount</TableHead>
                          <TableHead>Shipping</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <Image
                              src={order.cartItem.productImage}
                              width="30"
                              height="130"
                              alt="product"
                            />
                          </TableCell>
                          <TableCell>{order.cartItem.qty}</TableCell>
                          <TableCell>{order.cartItem.variant.price}</TableCell>
                          <TableCell>
                            {order.cartItem.variant.discount}%
                          </TableCell>
                          <TableCell>{order.shippingAmount}</TableCell>
                          <TableCell>
                            {(
                              discountPrice(
                                order.cartItem.variant.price,
                                order.cartItem.variant.discount
                              ) *
                                order.cartItem.qty +
                              order.shippingAmount
                            ).toFixed(2)}
                          </TableCell>
                          <TableCell> {order.status}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="col-span-1 space-y-4">
              <div className="flex flex-col gap-4 col-span-2">
                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">
                      Save your changes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-4">
                    <Button
                      className="max-w-40 text-xl capitalize "
                      variant="secondary"
                      size="lg"
                      disabled={isUpdating}
                      type="submit"
                    >
                      <Loader2Icon
                        className={cn(
                          "hidden mr-2 h-6 w-6 animate-spin",
                          isUpdating && "block"
                        )}
                      />
                      save
                    </Button>
                  </CardContent>
                </Card>

                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">Tracking</CardTitle>
                  </CardHeader>
                  <CardContent className="py-10">
                    <Select
                      onValueChange={(e) => updateTrackOrder(e)}
                      defaultValue={order.trackorder.status}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue="orderplaced"
                            placeholder={order.trackorder.status}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {trackingStatus.map(
                          (item: {
                            name: string;
                            description: string;
                            slug: string;
                          }) => (
                            <SelectItem
                              key={item.slug}
                              value={item.slug}
                              className="capitalize"
                              title={item.description}
                            >
                              {item.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="rounded-xl bg-white shadow-xl">
                  <CardHeader className="border-b border-border">
                    <CardTitle className="font-normal">Status*</CardTitle>
                  </CardHeader>
                  <CardContent className="py-10">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              disabled={isUpdating}
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    defaultValue={field.value}
                                    placeholder="Select a status"
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {orderStatus.map(
                                  (item: {
                                    name: string;
                                    description: string;
                                  }) => (
                                    <SelectItem
                                      key={item.name}
                                      value={item.name}
                                      className="capitalize"
                                      title={item.description}
                                    >
                                      {item.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
