"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/custom/Loading";
import Container from "@/components/custom/Container";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
//@ts-expect-error: this package do not have type
import SimpleDateTime from "react-simple-timestamp-to-date";
import { useAuth } from "@clerk/nextjs";

export default function PaymentCompleted() {
  const router = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [data, setData] = useState<any>();

  // Api call using use effect
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = await getToken();
      await axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/user/subscriptions?session_id=" +
            router.get("session_id"),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (router.get("session_id")) getData();
  }, [router]);
  return (
    <section className="py-20">
      {loading && <Loading loading={true} />}
      <Container>
        <div className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
          <div className="mx-auto max-w-2xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
              Thanks for your payment!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 md:mb-8">
              Your payment
              <a
                href="#"
                className="font-medium text-gray-900 dark:text-white hover:underline"
              >
                #{data && data?.payment_intent.id}
              </a>
              have been processed.
            </p>
            <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8">
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Payment status
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && data?.payment_status}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Date
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && (
                    <SimpleDateTime
                      dateFormat="DMY"
                      dateSeparator="/"
                      timeSeparator=":"
                    >
                      {data.payment_intent.created}
                    </SimpleDateTime>
                  )}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Amount
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && data.payment_intent.amount / 100}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Amount paid
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && data.payment_intent.amount_received / 100}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Currency
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && data.payment_intent.currency}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Client name
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && data.payment_intent.shipping.name}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Client address
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data &&
                    data.payment_intent.shipping.address.city +
                      ", " +
                      data.payment_intent.shipping.address.postal_code}
                </dd>
              </dl>
              <dl className="sm:flex items-center justify-between gap-4">
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400">
                  Client phone
                </dt>
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {data && data.payment_intent.shipping.phone}
                </dd>
              </dl>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/stores"
                className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Return to dashboard
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
