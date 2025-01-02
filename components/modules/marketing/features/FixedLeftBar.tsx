import React from "react";

export default function page({
  setShowContent,
}: {
  setShowContent: (v: string) => void;
}) {
  return (
    <div className="overflow-y-auto min-w-60 h-[790px] hidden lg:flex">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <h6 className="font-bold cursor-pointer tracking-wider">Customers</h6>
          <h6
            onClick={() => setShowContent("buy-a-product")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Buy a product
          </h6>
          <h6
            onClick={() => setShowContent("ship-product")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Ship products
          </h6>
          <h6
            onClick={() => setShowContent("pay-product")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Pay products
          </h6>
          <h6
            onClick={() => setShowContent("track-order")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Track orders
          </h6>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="font-bold cursor-pointer tracking-wider">Vendors</h6>
          <h6
            onClick={() => setShowContent("create-product")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Create products
          </h6>
          <h6
            onClick={() => setShowContent("manage-orders")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Manage orders
          </h6>
          <h6
            onClick={() => setShowContent("create-campaigns")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Create campaigns
          </h6>

          <h6
            onClick={() => setShowContent("create-subscriptions")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Create subscription
          </h6>
        </div>

        <div className="flex flex-col gap-4">
          <h6 className="font-bold cursor-pointer tracking-wider">Admin</h6>
          <h6
            onClick={() => setShowContent("manage-products-acc")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Manage products acc.
          </h6>
          <h6
            onClick={() => setShowContent("manage-shippings")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Manage shippings
          </h6>
          <h6
            onClick={() => setShowContent("manage-payments")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Manage payments
          </h6>
          <h6
            onClick={() => setShowContent("manage-stores")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Manage stores
          </h6>
          <h6
            onClick={() => setShowContent("manage-subscriptions")}
            className="text-heading cursor-pointer hover:text-primary-400 duration-100 ease-linear  hover:translate-x-2 tracking-wider"
          >
            Manage subscriptions
          </h6>
        </div>
      </div>
    </div>
  );
}
