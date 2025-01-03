"use client";

import { Alert } from "@/components/custom/Alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { SwitchRequestArgs } from "@/types/mutations";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Shuffle } from "lucide-react";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

export default function Swicth({ check }: { check: boolean }) {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { userId } = useAuth();
  const { getToken } = useAuth();

  const switchRequest = async (
    url: string,
    { arg }: { arg: SwitchRequestArgs }
  ) => {
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
        console.log(data);
        // notification
        toast({
          variant: "default",
          title: "Well done",
          description: data.message,
        });

        setOpenAlert(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  const { trigger: SwitchAccount, isMutating: isSwitching } = useSWRMutation(
    process.env.NEXT_PUBLIC_API_URL + "/api/user/users",
    switchRequest
  );

  const onSwitchToAdmin = async () => {
    await SwitchAccount({
      queryParams: {
        userId: userId ?? "",
        role: check ? "user" : "admin",
      },
    });
  };

  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4">
      <Card className="flex justify-between items-center">
        <CardHeader>
          <CardTitle>Swicth my account</CardTitle>
          <CardDescription className="text-red-600">
            Make sure to sign out and sign in again to see effect
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
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
        onConfirm={onSwitchToAdmin}
        setOpenAlert={setOpenAlert}
        isDeleting={isSwitching}
      />
    </div>
  );
}
