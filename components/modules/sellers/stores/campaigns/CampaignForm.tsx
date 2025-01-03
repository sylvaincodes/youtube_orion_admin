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
import { statusCampaigns } from "@/constants";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { TypeProductModel, TypeSlideModel } from "@/types/models";
import { slugString } from "@/lib/helpers";
import Link from "next/link";
import { ChevronLeft, Info } from "lucide-react";
import Loading from "@/components/custom/Loading";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function CampaignForm({
  storeId,
  _id,
}: {
  storeId?: string;
  _id?: string;
}) {
  // 0. set state
  const [slides, setSlides] = useState<TypeSlideModel[]>();
  const [products, setProducts] = useState<TypeProductModel[]>();
  const [isLoading, setLoading] = useState(false);
  const [slideitem, setData] = useState<SlideitemFormData>();
  const router = useRouter();
  const { userId, getToken } = useAuth();

  // 1. Fetching slides
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/public/slides")
        .then((response) => {
          setSlides(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getData();

    const getProducts = async () => {
      setLoading(true);
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/public/products?storeId=" +
            storeId
        )
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
    getData();
    getProducts();
  }, []);

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
        if (data.success === false) {
          toast({
            variant: "default",
            title: "Upgrade to Pro!",
            description: data.message,
          });
        } else {
          toast({
            variant: "default",
            title: "Well done ✔️",
            description: data.message,
            action: (
              <ToastAction altText={`Go to ${data.data.name}`}>
                <Link href={`/stores/${storeId}/campaigns/${data.data._id}`}>
                  Go to {data.data.name.substring(0, 15)}
                </Link>
              </ToastAction>
            ),
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "default",
          title: "OOps ❌",
          description: err.message,
        });
        console.log(err.message);
      })
      .finally(() => {
        router.refresh();
      });
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
        if (data.success === false) {
          toast({
            variant: "default",
            title: "Upgrade to Pro!",
            description: data.message,
          });
        } else {
          toast({
            variant: "default",
            title: "Well done ✔️",
            description: data.message,
            action: (
              <ToastAction altText={`Go to ${data.data.name}`}>
                <Link href={`/stores/${storeId}/campaigns/${data.data._id}`}>
                  Go to {data.data.name.substring(0, 15)}
                </Link>
              </ToastAction>
            ),
          });
        }
      })
      .catch((err) => {
        toast({
          variant: "default",
          title: "OOps ❌",
          description: err.message,
        });
        console.log(err);
      })
      .finally(() => {});
  }

  // 3. Set Form mutation
  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    "/api/user/campaigns",
    postRequest /* options */
  );
  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/user/campaigns",
    putRequest /* options */
  );

  // 4. Define your validation and default values.
  const form = useForm<z.infer<typeof SlideitemValidationSchema>>({
    resolver: zodResolver(SlideitemValidationSchema),
    defaultValues: slideitem
      ? slideitem
      : {
          slide: slides && slides[0]._id,
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
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/user/campaigns", {
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
    values: z.infer<typeof SlideitemValidationSchema>
  ) => {
    const data = {
      slide: values.slide,
      product: values.product,
      name: values.name,
      slug: values.slug,
      description: values.description,
      image: values.image,
      status: values.status,
      title: values.title,
      subtitle: values.subtitle,
      textColor: values.textColor,
      btn: values.btn,
      store: storeId,
      user_id: userId,
    };

    if (slideitem) {
      await update(data);
    } else {
      await create(data);
    }
  };

  // 7. Update slug
  const createSlug = (value: string) => {
    const val = slugString(value);
    form.setValue("slug", val);
  };

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name={
              slideitem
                ? `campaign - ${slideitem.name.substring(0, 15)}`
                : `Add new campaign`
            }
            description="Fill the required (*) input(s) and click on save to continue."
          />
          {slideitem?.status === "approve" && (
            <Badge variant="green">Campaign approved</Badge>
          )}
          {slideitem?.status === "reject" && (
            <Badge variant="destructive">Campaign rejected</Badge>
          )}
          <Link
            href={`/stores/${storeId}/campaigns`}
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
                    name="slide"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zone</FormLabel>
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
                                slides.map((item) => (
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
                        <FormDescription>
                          Check the &nbsp;
                          <Link
                            target="_blank"
                            className="underline text-primary-900"
                            href="/features"
                          >
                            Docs &nbsp;
                          </Link>
                          to make sure using the specifications required
                          otherwise your campaign might be rejected
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
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
                                  placeholder="Select a product"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {products &&
                                products.map((item) => (
                                  <SelectItem
                                    key={item._id}
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
                    Save your changes*
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <Button
                    className="max-w-40 text-xl capitalize"
                    variant="default"
                    size="lg"
                    disabled={
                      isCreating ||
                      isUpdating ||
                      isLoading ||
                      slideitem?.status === "approve"
                    }
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
                        <FormDescription>
                          width and height depend on Zone. Check the
                          <Link
                            target="_blank"
                            className="underline text-primary-900"
                            href="/features"
                          >
                            Docs
                          </Link>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal">Status* </CardTitle>
                </CardHeader>
                <CardContent className="py-10">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            disabled={
                              isCreating || slideitem?.status === "approve"
                            }
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
                              {statusCampaigns.map((item) => (
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
