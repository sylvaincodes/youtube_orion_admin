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
import { ShippingFormData } from "@/types/forms";
import { shippingValidationSchema } from "@/types/schemas";
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
import { regions, status } from "@/constants";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { slugString } from "@/lib/helpers";
import Link from "next/link";
import { Check, ChevronsUpDown, Info } from "lucide-react";
import Image from "next/image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Loading from "@/components/custom/Loading";

export default function ShippingForm({ _id }: { _id?: string }) {
  // 1. set state
  const [isLoading, setLoading] = useState(false);
  const [shipping, setData] = useState<ShippingFormData>();
  const router = useRouter();
  const { userId, getToken } = useAuth();
  const [value, setValue] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState(false);

  // 2. Form method
  async function postRequest(url: string, { arg }: { arg: ShippingFormData }) {
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
              <Link href={`/admin/shippings/${data.data._id}`}>
                Go to {data.data.name}
              </Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        router.refresh();
      });
  }
  async function putRequest(url: string, { arg }: { arg: ShippingFormData }) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: { _id: shipping?._id },
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
              <Link href={`/admin/shippings`}>Go to List</Link>
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
    "/api/admin/shippings",
    postRequest /* options */
  );
  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/admin/shippings",
    putRequest /* options */
  );

  // 4. Define your validation and default values.
  const form = useForm<z.infer<typeof shippingValidationSchema>>({
    resolver: zodResolver(shippingValidationSchema),
    defaultValues: shipping
      ? shipping
      : {
          name: "",
          slug: "",
          description: "",
          status: "draft",
          image: "https://cdn-icons-png.flaticon.com/128/10446/10446694.png",
          user_id: userId,
          region: value,
          delay: 0,
          fixed_amount: 0,
          fees: 0,
          unit_price_weight: 0,
          price_range_start: 0,
          price_range_end: 0,
        },
  });

  // 5. Reset form default values if edit
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = await getToken();
      await axios
        .get(process.env.NEXT_PUBLIC_API_URL + "/api/admin/shippings", {
          params: { _id: _id },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data.data);
          setValue(response.data.data.region);
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
  const onSubmit = async (values: z.infer<typeof shippingValidationSchema>) => {
    const data = {
      name: values.name,
      slug: values.slug,
      description: values.description,
      image: values.image,
      status: values.status,
      user_id: userId,
      region: value,
      delay: values.delay,
      fixed_amount: values.fixed_amount,
      fees: values.fees,
      unit_price_weight: values.unit_price_weight,
      price_range_start: values.price_range_start,
      price_range_end: values.price_range_end,
    };

    if (shipping) {
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

  //5
  const handleSetValue = (val: string) => {
    if (val === "all") {
      setValue([]);
      setValue((prevValue) => [...prevValue, val]);
    } else {
      if (value.includes("all")) {
        setValue([]);
      }
      if (value.includes(val)) {
        value.splice(value.indexOf(val), 1);
        setValue(value.filter((item) => item !== val));
      } else {
        setValue((prevValue) => [...prevValue, val]);
      }
    }
  };

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap space-y-4 justify-between items-center">
          <Heading
            name={
              shipping
                ? `shipping - ${shipping?.name.substring(0, 15)}`
                : `Add new shipping`
            }
            description="Fill the required (*) input(s) and click on save to continue."
          />
          <Link
            href="/admin/shippings"
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
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild value={value} defaultValue={value}>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[360px] justify-between"
                      >
                        <div className="flex gap-2 justify-start">
                          {value?.length
                            ? value.map((val, i) => (
                                <div
                                  key={i}
                                  className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium"
                                >
                                  {
                                    regions.find(
                                      (framework) => framework.name === val
                                    )?.name
                                  }
                                </div>
                              ))
                            : "Select region..."}
                        </div>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[360px] p-0">
                      <Command>
                        <CommandInput placeholder="Search region..." />
                        <CommandEmpty>No region found.</CommandEmpty>
                        <CommandList>
                          <CommandGroup>
                            {regions.map((framework) => (
                              <CommandItem
                                key={framework.name}
                                value={framework.name}
                                onSelect={() => {
                                  handleSetValue(framework.name);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    value?.includes(framework.name)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                <Image
                                  src={framework.image}
                                  width="30"
                                  height="30"
                                  alt="image"
                                />

                                <span className="ms-2">{framework.name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                      <FormMessage />
                    </PopoverContent>
                  </Popover>

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

                  <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="delay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Delay (Days)</FormLabel>
                            <FormControl>
                              <Input placeholder="Days" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="fees"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fees</FormLabel>
                            <FormControl>
                              <Input placeholder="0" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
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
                </CardContent>
              </Card>

              <Card className="rounded-xl bg-white shadow-xl">
                <CardHeader className="border-b border-border">
                  <CardTitle className="font-normal"> Price*</CardTitle>
                </CardHeader>
                <CardContent className="p-10 flex flex-col gap-8">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name="fixed_amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fixed amount</FormLabel>
                          <FormControl>
                            <Input placeholder="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
