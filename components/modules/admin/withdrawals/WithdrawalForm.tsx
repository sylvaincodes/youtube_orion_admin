"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { WithdrawalFormData } from "@/types/forms";
import { withdrawalValidationSchema } from "@/types/schemas";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { statusWithdrawals } from "@/constants";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { Info } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Loading from "@/components/custom/Loading";

export default function WithdrawalForm({
  _id,
  store,
}: {
  _id?: string;
  store?: string;
}) {
  // 1. set state
  const [isLoading, setLoading] = useState(false);
  const [withdrawal, setData] = useState<WithdrawalFormData>();
  const router = useRouter();
  const { userId } = useAuth();
  const { getToken } = useAuth();

  // 2. Form method
  async function postRequest(
    url: string,
    { arg }: { arg: WithdrawalFormData }
  ) {
    const token = await getToken();
    return await axios
      .post(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        toast({
          variant: "default",
          title: "Well done ✔️",
          description: data.message,
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        router.refresh();
      });
  }
  async function putRequest(url: string, { arg }: { arg: WithdrawalFormData }) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: { _id: _id },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        toast({
          variant: "default",
          title: "Well done ✔️",
          description: data.message,
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  // 3. Set Form mutation
  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    "/api/user/withdrawals",
    postRequest /* options */
  );
  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/user/withdrawals",
    putRequest /* options */
  );

  // 4. Define your validation and default values.
  const form = useForm<z.infer<typeof withdrawalValidationSchema>>({
    resolver: zodResolver(withdrawalValidationSchema),
    defaultValues: withdrawal ? withdrawal : {},
  });

  // 5. Reset form default values if edit
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = await getToken();
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/user/withdrawals", {
          params: { _id: _id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.data);
          form.reset(response.data.data);
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
  }, [form.reset]);

  // 6. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof withdrawalValidationSchema>
  ) => {
    const data = {
      amount: values.amount,
      paypal: values.paypal,
      status: values.status,
      store: withdrawal ? withdrawal.store : store,
      user_id: userId,
    };

    if (withdrawal) {
      await update(data);
    } else {
      await create(data);
    }
  };

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name={`Edit withdrawal`}
            description="Fill the required (*) input(s) and click on save to continue."
          />
          <Link
            href={`/admin/withdrawals`}
            className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
          >
            <ChevronLeft className="me-1" />
            Go to list
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
            <div className="flex flex-col gap-4 col-span-2">
              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal"> Basics info*</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Withdrawal</FormLabel>
                        <FormControl>
                          <Input readOnly placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="paypal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Paypal account</FormLabel>
                        <FormControl>
                          <Input readOnly placeholder="" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    className="max-w-40 text-xl capitalize"
                    variant="default"
                    size="lg"
                    disabled={isCreating || isUpdating || isLoading}
                    type="submit"
                  >
                    save
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
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
                            disabled={isCreating}
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
                              {statusWithdrawals
                                .filter(
                                  (item) =>
                                    item.name === "publish" ||
                                    item.name === "paid" ||
                                    item.name === "pending"
                                )
                                .map((item) => (
                                  <SelectItem
                                    key={item.name}
                                    value={item.name}
                                    className="capitalize"
                                    title={item.description}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription className="flex gap-4 py-4 justify-center w-full">
                          <Info /> Hover an option in list to see more details
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
