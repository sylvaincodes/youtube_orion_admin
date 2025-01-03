"use client";

import { z } from "zod";
import Heading from "@/components/custom/Heading";
import { Separator } from "@/components/ui/separator";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { SubcategoryValidationSchema } from "@/types/schemas";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWRMutation from "swr/mutation";
import { TypeCategoryModel } from "@/types/models";
import useSWR, { Fetcher } from "swr";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/custom/ImageUpload";
import Loading from "@/components/custom/Loading";
import { status } from "@/constants";
import { slugString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubcategoryFormData } from "@/types/forms";

export default function SubCategoryForm({ _id }: { _id?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const router = useRouter();
  //states
  const [subcategory, setData] = useState<SubcategoryFormData>();
  const { userId } = useAuth();
  // define form
  const form = useForm<z.infer<typeof SubcategoryValidationSchema>>({
    resolver: zodResolver(SubcategoryValidationSchema),
    defaultValues: subcategory
      ? subcategory
      : {
          category: "",
          name: "",
          slug: "",
          description: "",
          status: "draft",
          image: "https://cdn-icons-png.flaticon.com/128/10446/10446694.png",
          user_id: userId,
        },
  });

  //define the submit handler
  const onSubmit = async (
    values: z.infer<typeof SubcategoryValidationSchema>
  ) => {
    const data = {
      category: values.category,
      name: values.name,
      slug: values.slug,
      description: values.description,
      image: values.image,
      status: values.status,
      user_id: userId,
    };

    if (subcategory) {
      await update(data);
    } else {
      await create(data);
    }
  };

  // Form method request
  async function postRequest(
    url: string,
    { arg }: { arg: SubcategoryFormData }
  ) {
    const token = await getToken();
    return await axios
      .post(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        toast({
          title: "Well done!",
          description: data.message,
          action: (
            <ToastAction altText={`Go to ${data.data.name}`}>
              <Link href={` /admin/subcategories/${data.data._id} `}>
                Go to {data.data.name}
              </Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        router.refresh();
      });
  }
  async function putRequest(
    url: string,
    { arg }: { arg: SubcategoryFormData }
  ) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: {
          _id: subcategory?._id,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data = res.data;
        toast({
          title: "Well done!",
          description: data.message,
          action: (
            <ToastAction altText={`Go to ${data.data.name}`}>
              <Link href={` /admin/subcategories/${data.data._id} `}>
                Go to {data.data.name}
              </Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        router.refresh();
      });
  }

  // SWR Trigger
  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    "/api/admin/subcategories",
    postRequest
  );
  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/admin/subcategories",
    putRequest
  );

  //fetching categories
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

  //get categories
  const categories = useSWR<TypeCategoryModel[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/categories",
    fetcher
  );

  // slug
  const createSlug = (v: string) => {
    const val = slugString(v);
    form.setValue("slug", val);
  };

  // Get edit data
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const token = await getToken();
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/subcategories", {
          params: { _id: _id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          form.reset(res.data.data);
        })
        .then((err) => console.log(err))
        .finally(() => setIsLoading(false));
    };

    getData();
  }, [form.reset]);

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name={
              _id
                ? `Edit - ${subcategory && subcategory.name.substring(0, 15)}`
                : `Add new Sub category`
            }
            description="Fill the required (*) input(s) and click on save to continue."
          />
          <Link
            href="/admin/subcategories"
            className="bg-black p-4 flex items-center gap-4 text-white rounded-md text-xl"
          >
            <ChevronLeft />
            Go to list
          </Link>
        </div>
        <Separator />
      </div>

      {/* forms */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-12 my-8 lg:gap-x-12">
            <div className="flex flex-col gap-4 col-span-2">
              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">Basics info*</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col  gap-8">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            disabled={subcategory ? true : false}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a category"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories &&
                                categories.data?.map((item) => (
                                  <SelectItem
                                    key={item.name}
                                    value={item._id}
                                    className="capitalize"
                                    title={item.description}
                                  >
                                    {item.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            onInput={(e) => createSlug(e.currentTarget.value)}
                            placeholder="put name here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            readOnly
                            placeholder="slug-auto-generated"
                            {...field}
                          />
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
                            cols={100}
                            rows={3}
                            placeholder="Put your description here"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    variant="default"
                    size="lg"
                    className="text-xl capitalize max-w-40"
                    type="submit"
                    disabled={isLoading || isCreating || isUpdating}
                  >
                    {subcategory ? "update" : "save"}
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Image *</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={(url) => {
                              field.onChange(url);
                            }}
                            onRemove={() => {
                              field.onChange();
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Status *</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a category"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {status &&
                                status.map((item) => (
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
