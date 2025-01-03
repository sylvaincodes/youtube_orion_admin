"use client";
import React, { useState } from "react";
import {
  Check,
  ChevronsUpDown,
  DoorOpen,
  PlusCircle,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { CommandSeparator } from "cmdk";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StoreCreateForm } from "./StoreCreateForm";
import { TypeStoreModel } from "@/types/models";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Loading from "@/components/custom/Loading";
import useSWR, { Fetcher } from "swr";

export default function StoreModal({
  storeId,
  className,
}: {
  storeId?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = React.useState(storeId);
  const [openAddStore, setOpenAddStore] = useState(false);
  const router = useRouter();
  const { userId, getToken } = useAuth();

  const fetcher: Fetcher<TypeStoreModel[], string> = async (url) => {
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

  const { data: stores, isLoading } = useSWR<TypeStoreModel[]>(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/stores?userId=" + userId,
    fetcher
  );

  if (isLoading) return <Loading loading={true} />;

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("justify-between", className)}
          >
            <DoorOpen />
            <h6 className="font-bold text-[14px] capitalize">
              {value
                ? stores &&
                  stores
                    .find((item: TypeStoreModel) => item._id === value)
                    ?.name.substring(0, 15)
                : "Select a store..."}
            </h6>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("w-[320px] lg:w-[620px] p-0", className)}>
          <Command>
            <CommandInput placeholder="Search stores..." />
            <CommandList>
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup>
                {stores &&
                  stores.map((framework: TypeStoreModel) => (
                    <CommandItem
                      key={framework._id}
                      value={framework._id}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? value : currentValue);
                        setOpen(false);
                        router.push(`/stores/${framework._id}/dashboard`);
                      }}
                    >
                      <Store className="mr-2 h-4 w-4" />
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === framework._id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <h6 className="capitalize">
                        {framework.name.substring(0, 15)}
                      </h6>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator />
            <CommandList>
              <CommandItem
                // disabled={sub?.type === "free" ? true : false}
                key="addstore"
                value="addstore"
                onSelect={() => setOpenAddStore(!openAddStore)}
              >
                <span className="w-full flex p-3 items-center gap-4 cursor-pointer hover:bg-black hover:text-white rounded-md justify-center">
                  <PlusCircle className="h-6 w-6" />
                  <span className="text-xl">Create new store</span>
                  {/* {sub && sub.type === "free" && (
                    <Badge variant="default">Pro</Badge>
                  )} */}
                </span>
              </CommandItem>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Dialog
        open={openAddStore}
        onOpenChange={() => setOpenAddStore(!openAddStore)}
      >
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Create a store</DialogTitle>
            <DialogDescription>
              Fill the form and click on submit.
            </DialogDescription>
          </DialogHeader>
          <StoreCreateForm setOpenAddStore={setOpenAddStore} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
