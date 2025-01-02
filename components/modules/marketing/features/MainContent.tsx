import Image from "next/image";
import React from "react";

export default function MainContent({ showContent }: { showContent: string }) {
  return (
    <div className="flex flex-col gap-4 items-start h-full">
      {showContent === "buy-a-product" && (
        <>
          <div className="flex">buy-a-product interface</div>
        </>
      )}
      {showContent === "ship-product" && (
        <>
          <div className="flex">ship-product management tools</div>
        </>
      )}
      {showContent === "pay-product" && (
        <>
          <div className="flex">performance</div>
        </>
      )}
      {showContent === "track-order" && (
        <>
          <div className="flex">Security</div>
        </>
      )}
      {showContent === "create-product" && (
        <>
          <div className="flex">Marketing, promotions, and SEO features</div>
        </>
      )}
      {showContent === "manage-orders" && (
        <>
          <div className="flex">Marketing, promotions, and SEO features</div>
        </>
      )}
      {showContent === "create-campaigns" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/5968/5968382.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
      {showContent === "create-subscriptions" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1377/1377239.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
      {showContent === "manage-products-acc" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1377/1377239.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
      {showContent === "manage-shippings" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1377/1377239.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
      {showContent === "manage-payments" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1377/1377239.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
      {showContent === "manage-stores" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1377/1377239.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
      {showContent === "manage-subscriptions" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>Multiple payments</h2>
            <h6 className="text-heading">
              A range of payment options when shopping online.
            </h6>
          </div>

          <div className="grid grid-cols-2 mt-10">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/1377/1377239.png"
                alt="stripe"
                width="100"
                height="100"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
