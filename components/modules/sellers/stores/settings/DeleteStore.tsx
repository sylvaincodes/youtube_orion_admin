"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shuffle, Trash } from "lucide-react";
import  Alert  from "@/components/custom/Alert";
import { TypeStoreModel } from "@/types/models";

import useSWRMutation from "swr/mutation";
import { DeleteRequestArgs, SwitchRequestArgs } from "@/types/mutations";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";

export default function DeleteStore({
  data,
  check,
}: {
  data: TypeStoreModel;
  check: boolean;
}) {
  // 1. Hooks
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const router = useRouter();
  const { getToken } = useAuth();

  async function sendRequest(url: string, { arg }: { arg: DeleteRequestArgs }) {
    const token = await getToken();
    return await axios
      .delete(url, {
        params: arg.queryParams,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        toast(data.message);
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        router.refresh();
      });
  }

  async function switchRequest(
    url: string,
    { arg }: { arg: SwitchRequestArgs }
  ) {
    const token = await getToken();
    return await axios
      .put(url, arg.queryParams, {
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
        location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        router.push("/admin/dashboard");
      });
  }

  // 1. Set api mutation
  const { trigger: DeleteStore, isMutating: isDeleting } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/stores",
    sendRequest /* options */
  );

  const { trigger: SwitchAccount, isMutating: isSwitching } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/users",
    switchRequest /* options */
  );

  // Define a submit handler.
  const onDelete = async () => {
    await DeleteStore({
      queryParams: { storeId: data._id },
    });
  };

  // Define a submit handler.
  const onSwitchToAdmin = async () => {
    await SwitchAccount({
      queryParams: { userId: data.user_id, role: check ? "user" : "admin" },
    });
  };

  console.log(check);
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4">
      <Card className="min-w-[360px] flex justify-between items-center">
        <CardHeader className="!h-fit">
          <CardTitle>Delete</CardTitle>
          <CardDescription>Move your store to trash</CardDescription>
        </CardHeader>
        <CardContent className="grid place-content-center">
          <Button
            disabled={isDeleting}
            variant="danger"
            size="icon"
            onClick={() => setOpenAlert(!openAlert)}
          >
            <Trash className="text-white" />
          </Button>
        </CardContent>
      </Card>

      <Card className="min-w-[360px] flex justify-between items-center">
        <CardHeader className="!h-fit">
          <CardTitle>Switch my account</CardTitle>
          <CardDescription className="text-red-600">
            Make sure to sign out and sign in again to see effect.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid place-content-center">
          <Button
            disabled={isDeleting}
            variant="default"
            size="icon"
            onClick={() => setOpenAlert(!openAlert)}
          >
            <Shuffle className="text-white" />
          </Button>
        </CardContent>
      </Card>

      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        onConfirm={onDelete}
        isDeleting={isDeleting}
      />

      <Alert
        openAlert={openAlert}
        setOpenAlert={setOpenAlert}
        onConfirm={onSwitchToAdmin}
        isDeleting={isSwitching}
      />
    </div>
  );
}
