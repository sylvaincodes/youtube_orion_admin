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
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SlideitemFormData } from "@/types/forms";
import { SlideitemValidationSchema } from "@/types/schemas";
import { z } from "zod";
import ImageUpload from "@/components/custom/ImageUpload";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { status } from "@/constants";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { TypeSlideModel } from "@/types/models";
import { slugString } from "@/lib/helpers";
import Link from "next/link";
import { Eye, Info } from "lucide-react";
import useSWR, { Fetcher } from "swr";
import Loading from "@/components/custom/Loading";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";

export default function SlideItemForm({
  _id,
  storeId,
}: {
  _id?: string;
  storeId?: string;
}) {
  const { getToken } = useAuth();

  // fecthing slides
  const fetcher: Fetcher<TypeSlideModel[], string> = async (url) => {
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
  const slides = useSWR<TypeSlideModel[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/slides",
    fetcher
  );

  // 1. set state
  const [isLoading, setLoading] = useState(false);
  const [slideitem, setData] = useState<SlideitemFormData>();
  const { userId } = useAuth();

  // 2. Form method
  async function postRequest(url: string, { arg }: { arg: SlideitemFormData }) {
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
          action: (
            <ToastAction altText={`Go to ${data.data.name}`}>
              <Link href={`/admin/slideitems/${data.data._id}`}>
                Go to {data.data.name}
              </Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }
  async function putRequest(url: string, { arg }: { arg: SlideitemFormData }) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: { _id: slideitem?._id },
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
          action: (
            <ToastAction altText={`Go to ${data.data.name}`}>
              <Link href={`/admin/slideitems`}>Go to List</Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  // 3. Set Form mutation
  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    "/api/admin/slideitems",
    postRequest /* options */
  );
  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/admin/slideitems",
    putRequest /* options */
  );

  // 4. Define your validation and default values.
  const form = useForm<z.infer<typeof SlideitemValidationSchema>>({
    resolver: zodResolver(SlideitemValidationSchema),
    defaultValues: slideitem
      ? slideitem
      : {
          slide: slides && slides?.data ? slides.data[0]._id : "",
          name: "",
          description: "",
          slug: "",
          image: "https://cdn-icons-png.flaticon.com/128/10446/10446694.png",
          store: storeId,
          user_id: userId,
          status: "draft",
        },
  });

  // 5. Reset form default values if edit
  useEffect(() => {
    const getData = async () => {
      setLoading(true);

      const token = await getToken();
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/slideitems", {
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
    getData();
  }, [form.reset]);

  // 3. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof SlideitemValidationSchema>
  ) => {
    const data = {
      slide: values.slide,
      name: values.name,
      slug: values.slug,
      description: values.description,
      image: values.image,
      status: values.status,
      store: storeId,
      user_id: userId,
      product: slideitem ? slideitem.product : "",
    };

    if (slideitem) {
      await update(data);
    } else {
      await create(data);
    }
  };

  // 4. Update slug
  const createSlug = (value: string) => {
    const val = slugString(value);
    form.setValue("slug", val);
  };

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name={
              slideitem
                ? `Campaign - ${slideitem.name.substring(0, 15)}`
                : `Add new campaign`
            }
            description="Fill the required (*) input(s) and click on save to continue."
          />
          <Link
            href="/admin/slideitems"
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
                  {slideitem && (
                    <FormField
                      control={form.control}
                      name="store"
                      render={({ field }) => (
                        <FormItem>
                          <Link
                            href={`/admin/stores/${field.value}`}
                            className="flex items-center gap-4 text-green-600 font-bold underline"
                          >
                            <Eye />
                            See the store
                          </Link>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="slide"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slide</FormLabel>
                        <FormControl>
                          <Select
                            disabled={slideitem && true}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue
                                  defaultValue={field.value}
                                  placeholder="Select a slide"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {slides &&
                                slides?.data?.map((item) => (
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
                        <FormLabel>slug</FormLabel>
                        <FormControl>
                          <Input
                            className="font-bold"
                            readOnly
                            placeholder="slug-auto-generated"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This is auto generated for you!
                        </FormDescription>
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
                            cols={140}
                            rows={3}
                            placeholder="Put your description here."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal"> Optional info</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col gap-8">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="put title here" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave this empty if you want to use it in your banner
                          image
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Input placeholder="put subtitle here" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave this empty if you want to use only in your
                          banner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="btn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button</FormLabel>
                        <FormControl>
                          <Input placeholder="put button here" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave this empty if you want to use only in your
                          banner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="textColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color of text</FormLabel>
                        <FormControl>
                          <Input className="w-50" type="color" {...field} />
                        </FormControl>
                        <FormDescription>
                          Leave this empty if you want to use only in your
                          banner
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">
                    Save your changes
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4">
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

              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal"> Image*</CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            disabled={isCreating}
                            onChange={(url) => {
                              field.onChange(url);
                            }}
                            onRemove={() => field.onChange("")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                              {status
                                .filter((fil) => fil.name != "draft")
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
