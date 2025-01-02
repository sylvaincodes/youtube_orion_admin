import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { StoreFormData } from "@/types/forms";
import useSWRMutation from "swr/mutation";
import { storeValidationSchema } from "@/types/schemas";
import { z } from "zod";
import { TypeStoreModel } from "@/types/models";
import { Textarea } from "@/components/ui/textarea";
import { PutRequestArgs } from "@/types/mutations";
import DeleteStore from "./DeleteStore";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@clerk/nextjs";

export default function Informations({
  data,
  check,
}: {
  data: TypeStoreModel;
  check: boolean;
}) {
  const router = useRouter();
  const { getToken } = useAuth();

  async function sendRequest(url: string, { arg }: { arg: PutRequestArgs }) {
    const token = await getToken();
    return await axios
      .put(url, arg.requestBody, {
        params: arg.queryParams,
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
        console.log(err.response.data.err.errorResponse.errmsg);
      })
      .finally(() => {
        router.refresh();
      });
  }

  // 1. Set api mutation
  const {
    trigger: updateStore,
    isMutating: isUpdating,
    error,
  } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/stores",
    sendRequest /* options */
  );

  // 2. Define your validation.
  const form = useForm<z.infer<typeof storeValidationSchema>>({
    resolver: zodResolver(storeValidationSchema),
    defaultValues: {
      name: data.name,
      description: data.description,
    },
  });

  // 3. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof storeValidationSchema>) => {
    const newValues: StoreFormData = {
      name: values.name,
      description: values.description,
    };

    await updateStore({
      requestBody: newValues,
      queryParams: { storeId: data._id },
    });
  };

  return (
    <>
      <Card className="min-w-[360px]">
        <CardHeader>
          <CardTitle>Edit informations</CardTitle>
          <CardDescription>Change store basics informations</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {error && error}
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8  mt-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="put name here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Put your description here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={isUpdating} type="submit">
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <DeleteStore data={data} check={check} />
    </>
  );
}
