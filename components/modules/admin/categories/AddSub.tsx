import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TypeCategoryModel, TypeSubCategoryModel } from "@/types/models";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubcategoryArrayValidationSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function AddSub({
  category,
  subcategories,
}: {
  category: TypeCategoryModel;
  subcategories: TypeSubCategoryModel[];
}) {
  const { getToken } = useAuth();
  async function putRequest(url: string, { arg }: { arg: any }) {
    const token = await getToken();
    return await axios
      .put(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        params: { _id: category?._id, action: "categoryAddSub" },
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
              <Link href={`/admin/categories`}>Go to List</Link>
            </ToastAction>
          ),
        });
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Oups something went wrong",
          description: err.message,
        });
        console.log(err.message);
      })
      .finally(() => {});
  }

  // 1. Get user and set api

  const { trigger: update, isMutating: isUpdating } = useSWRMutation(
    "/api/admin/categories",
    putRequest /* options */
  );

  // 2. Define your validation.
  const form = useForm<z.infer<typeof SubcategoryArrayValidationSchema>>({
    resolver: zodResolver(SubcategoryArrayValidationSchema),
    defaultValues: {
      subCategory: category.subCategory,
    },
  });

  // 3. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof SubcategoryArrayValidationSchema>
  ) => {
    const data = {
      subCategory: values.subCategory,
    };

    await update(data);
  };
  return (
    <Dialog>
      <DialogTrigger className="font-bold text-primary-500 w-full m-auto">
        {category.subCategory.length} - Add more
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl ">Add Sub Categories</DialogTitle>
          <DialogDescription>
            Select one or multiple subcategory and save.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-8 flex-wrap p-4 max-h-[500px] overflow-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="subCategory"
                render={({ field }) => (
                  <FormItem>
                    {subcategories.map((item, idx: number) => {
                      //check if item._id is in field.value
                      const checked = field.value.find((val) =>
                        console.log("vale__", val)
                      )
                        ? true
                        : false;

                      console.log("ckecked_" + idx, checked);
                      return (
                        <FormField
                          key={item._id}
                          control={form.control}
                          name="subCategory"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item._id}
                                className="flex flex-row items-center capitalize space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item._id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            item._id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item._id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                  {item.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      );
                    })}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isUpdating}>
                Save
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
