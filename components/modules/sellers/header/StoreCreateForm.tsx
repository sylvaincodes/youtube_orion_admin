"use client";
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
import { storeValidationSchema } from "@/types/schemas";
import { z } from "zod";
import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";
import { StoreFormData } from "@/types/forms";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/custom/Loading";
import React from "react";

export function StoreCreateForm({
  setOpenAddStore,
}: {
  setOpenAddStore: (v: boolean) => void;
}) {
  const { getToken } = useAuth();
  const router = useRouter();
  async function sendRequest(url: string, { arg }: { arg: StoreFormData }) {
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

        if (data.success === false) {
          toast({
            variant: "default",
            title: "Upgrade to pro!",
            description: data.message,
          });
        } else {
          router.push(`/stores/${data.data._id}/dashboard`);
        }
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "OOps ✔️",
          description: err.message,
        });
        console.log(err.message);
      })
      .finally(() => {
        setOpenAddStore(false);
      });
  }

  // 1. Get user and set api
  const { userId } = useAuth();
  const { trigger, isMutating, error } = useSWRMutation(
    "/api/user/stores",
    sendRequest /* options */
  );

  // 2. Define your validation.
  const form = useForm<z.infer<typeof storeValidationSchema>>({
    resolver: zodResolver(storeValidationSchema),
    defaultValues: {
      name: "",
      description: "",
      user_id: "",
    },
  });

  // 3. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof storeValidationSchema>) => {
    const data = {
      name: values.name,
      description: values.description,
      user_id: userId,
    };
    await trigger(data /* options */);
  };

  if (isMutating) return <Loading loading={true} />;
  return (
    // 4. Define a form
    <Form {...form}>
      {error && error}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  mt-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="amazone" {...field} />
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
                <Textarea placeholder="Put your description here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isMutating} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
