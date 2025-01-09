"use client";
import Row from "@/components/custom/Row";
import { Button } from "@/components/ui/button";
import { subscriptionPlan } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CheckoutFormData } from "@/types/forms";
import { TypeSubscriptionModel } from "@/types/models";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutValidationSchema } from "@/types/schemas";
import { z } from "zod";
import getStripe from "@/lib/get-stripejs";
import { useRouter } from "next/navigation";
import { TypeSubscriptionPlan } from "@/types";
import Loading from "@/components/custom/Loading";

export default function Pricing() {
  const { userId } = useAuth();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<TypeSubscriptionModel>();
  const { getToken } = useAuth();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = await getToken();
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/user/subscriptions?user_id=" +
            userId,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setSubscription(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    getData();
  }, []);

  async function postRequest(url: string, { arg }: { arg: CheckoutFormData }) {
    const token = await getToken();
    return await axios
      .post(process.env.NEXT_PUBLIC_API_URL + url, arg, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const data = response.data;
        toast({
          variant: "default",
          title: "OK...✔️",
          description: data.message,
        });

        const stripe = await getStripe();
        await stripe!.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.data.id,
        });
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {});
  }

  // 1. Get user and set api
  const { trigger: create, isMutating: isCreating } = useSWRMutation(
    "/api/user/subscriptions",
    postRequest /* options */
  );

  // 2. Define your validation.
  const form = useForm<z.infer<typeof checkoutValidationSchema>>({
    resolver: zodResolver(checkoutValidationSchema),
    defaultValues: {
      user_id: userId ? userId : "",
      amount: subscriptionPlan[1].price,
    },
  });

  // 3. Define a submit handler.
  const onSubmit = async () => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    if (subscription?.type === "pro" && subscription.status === "active") {
      toast({
        variant: "default",
        title: "Already subscribed",
        description: "You have an active subscription",
      });
      return;
    }

    const data = {
      user_id: userId ? userId : "",
      amount: subscriptionPlan[1].price,
    };
    await create(data);
  };

  return (
    <>
      {isLoading && <Loading loading={true} />}
      <div className="w-full flex flex-col gap-4 justify-center items-center py-10">
        <h3>Pricing plans </h3>
        <h6>
          From free plan to complete premium plan, grow rapidly your store.
          Simple pricing, no hidden fees.
        </h6>

        <Row className="flex-wrap lg:flex-nowrap lg:gap-x-4">
          {subscriptionPlan.map((item: TypeSubscriptionPlan, idx: number) => (
            <div className="flex flex-wrap gap-4 mt-20" key={idx}>
              <div className="flex flex-col gap-8 border border-border p-8 rounded-lg min-w-[360px]">
                <div className="flex flex-col gap-8 mb-10">
                  <h5 className="capitalize">{item.type}</h5>
                  <p className="text-xl text-heading">{item.description}</p>
                </div>
                <div className="flex items-center gap-8">
                  <h2>${item.price}</h2>
                  <strong>/{item.period}</strong>
                </div>
                <div className="flex flex-col gap-8 mt-8 ">
                  {item.roles.map(
                    (role: { title: string; active: boolean }, idx: number) => (
                      <div className="flex gap-12" key={idx}>
                        <Check
                          className={cn(
                            "",
                            role.active
                              ? "text-black dark:text-white"
                              : "text-gray-400"
                          )}
                        />
                        <span
                          className={cn(
                            "text-xl",
                            !role.active && "line-through text-heading"
                          )}
                        >
                          {role.title}
                        </span>
                      </div>
                    )
                  )}

                  <div className="mt-auto">
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8 w-full"
                    >
                      <Button
                        type="submit"
                        variant="default"
                        className={cn(
                          "capitalize w-full",
                          subscription?.type === item.type &&
                            "bg-white text-black border border-border hover:text-white"
                        )}
                        disabled={
                          isCreating ||
                          isLoading ||
                          subscription?.type === item.type
                        }
                      >
                        {subscription?.type === item.type
                          ? "current plan"
                          : "Buy now"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </div>
    </>
  );
}
