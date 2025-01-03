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
import { SlideFormData } from "@/types/forms";
import { slideValidationSchema } from "@/types/schemas";
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
import { slugString } from "@/lib/helpers";
import Link from "next/link";
import { Info } from "lucide-react";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Loading from "@/components/custom/Loading";

export default function SlideForm({ _id }: { _id?: string }) {
  // 1. set state
  const [isLoading, setLoading] = useState(false);
  const [slide, setData] = useState<SlideFormData>();
  const router = useRouter();
  const { userId, getToken } = useAuth();

  // 2. Form method
  async function postRequest(url: string, { arg }: { arg: SlideFormData }) {
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
              <Link href={`/admin/slides/${data.data._id}`}>
                Go to {data.data.name.substring(0, 20)}
              </Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Oups something wen wrong ✔️",
          description: err.message,
        });
        console.log(err.message);
      })
      .finally(() => {
        router.refresh();
      });
  }
  async function putRequest(url: string, { arg }: { arg: SlideFormData }) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: { _id: slide?._id },
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
              <Link href={`/admin/slides`}>Go to List</Link>
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
    "/api/admin/slides",
    postRequest /* options */
  );
  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/admin/slides",
    putRequest /* options */
  );

  // 4. Define your validation and default values.
  const form = useForm<z.infer<typeof slideValidationSchema>>({
    resolver: zodResolver(slideValidationSchema),
    defaultValues: slide
      ? slide
      : {
          name: "example",
          description: "example",
          slug: "example",
          image: "https://cdn-icons-png.flaticon.com/128/10446/10446694.png",
          status: "publish",
        },
  });

  // 5. Reset form default values if edit
  useEffect(() => {
    const getData = async () => {
      const token = await getToken();
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/slides", {
          params: { _id: _id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data;
          setData(data.data);
          form.reset(data.data);
          console.log("___",data)
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    _id && getData();
  }, [form.reset]);

  // 6. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof slideValidationSchema>) => {
    const data = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      image: values.image,
      status: values.status,
      user_id: userId,
    };

    console.log(values);
    if (slide) {
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
              slide
                ? `edit - ${slide.name.substring(0, 15)}`
                : `Add new slide`
            }
            description="Fill the required (*) input(s) and click on save to continue."
          />
          <Link
            href="/admin/slides"
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onInput={(e) => createSlug(e.currentTarget.value)}
                            placeholder="put name here"
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
                            rows={5}
                            placeholder="Put your description here."
                            {...field}
                          />
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
                              {status.map((item) => (
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