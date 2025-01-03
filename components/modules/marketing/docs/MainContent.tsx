import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MainContent({ showContent }: { showContent: string }) {
  return (
    <section className="flex-1 mb-10 gap-4 items-start h-screen ">
      <section className="mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Gettings started</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="mb-12">
        {showContent === "introduction" && (
          <>
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-8 text-slate-600 text-balance">
                <h3>Introduction</h3>
                <h5>What is Orion ?</h5>
                <p className="text-xl/8">
                  Orion is a NextJs Multi Vendor eCommerce solution to build &
                  manage your dream multi vendor marketplace. <br /> This app is
                  <strong> fully customisable</strong> ,
                  <strong>well documented</strong> for non developers who want
                  to build their own project without coding <br /> and
                  developers who are willing to build their own project and
                  potentially implement new features to fulfill their need.
                </p>
                <h5>What is a Multi Vendor for ?</h5>
                <p className="text-xl/8">
                  A multi vendor ecommerce store comparatively to a single
                  vendor ecommerce store is a marketplace where many sellers
                  come together to sell their products (or services). Likewise,
                  in multiple vendor marketplaces, customers can buy products
                  from different sellers.
                </p>
                <h5>Difference between Multi Vendor and Single Vendor</h5>
                <p className="text-xl/8">
                  Unlike a single vendor store where business relationships are
                  two-fold (store and customer), a multiple vendor marketplace
                  involves three entities: a website administrator which is the
                  owner of the app, a vendor, and customer.
                </p>
                <p className="text-xl/8">
                  The admin is the owner of the site, he takes care of the
                  administration of the site, the monitoring of the stores, the
                  subscriptions of the vendors
                </p>
                <p className="text-xl/8">
                  A buyer or customer, is a professional responsible for
                  acquiring products and services for companies, either for
                  resale or operational use.
                </p>
                <p className="text-xl/8">
                  Vendors or sellers are people or businesses that sell items or
                  services online
                </p>
                <p className="text-xl/8">
                  doing business with a multiple-vendor ecommerce store has many
                  advantages.
                </p>
                <h5>
                  Key Benefits of Building a Multi Vendor Marketplace Platform
                </h5>
                <ul>
                  <li className="text-xl/8 underline text-primary-500 capitalize">
                    For a buyer
                  </li>
                  <li className="text-xl/8">
                    Operating a multi vendor store is financially less risky
                    beacuse of a lot of offers available on the market.
                  </li>

                  <li className="text-xl/8">
                    Also buyers can browse through product offerings from
                    different suppliers and switch between options within the
                    same space without leaving the site
                  </li>
                </ul>
                <ul>
                  <li className="text-xl/8 underline text-primary-500">
                    For a vendor or seller
                  </li>
                  <li className="text-xl/8">
                    With multiple vendors selling on the same platform,
                    customers have access to a wider range of products and
                    services. This means that customers are more likely to find
                    what they are looking for, increasing the chances of a sale
                    which increase seller &apos; s revenues as well
                  </li>
                </ul>
                <ul>
                  <li className="text-xl/8 underline text-primary-500">
                    For a owner
                  </li>
                  <li className="text-xl/8">
                    It can provide businesses with valuable data-driven
                    insights. The platform owner can track sales, customer
                    behavior, and other metrics to gain a better understanding
                    of how the platform is performing. This information can be
                    used to make data-driven decisions and improve the platform
                    over time.
                  </li>
                  <li className="text-xl/8">
                    Also, it can provide passive income if the platform is
                    offered some special features to users with the expectation
                    of a regular subscription in return
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
        {showContent === "features" && (
          <>
            <div className="flex flex-col space-y-8">
              <h4>Key features of Orion</h4>

              <p className="text-xl/8 text-balance">
                Orion is a modern and feature-rich React Next.js template
                designed for creating a dynamic digital marketplace. Whether you
                &apos; re building a platform for selling digital products,
                software, or creative assets, DpMarket offers a comprehensive
                solution that is perfect for multi-vendor environments. Its
                cutting-edge technology stack, combined with a clean and
                intuitive design, ensures a seamless user experience for both
                vendors and customers.
              </p>
              <ul className="flex flex-col space-y-4">
                <li>
                  <h5 className="text-primary-700">SASS </h5>
                </li>
                <li className="text-xl/8 text-balance">
                  &nbsp; Orion is not only a multi-vendor application, but also
                  a Software as a Service (SASS) that allows the owner to
                  generate revenue.
                </li>

                <li>
                  <h5 className="text-primary-700">Vendor Management </h5>
                </li>
                <li className="text-xl/8 text-balance">
                  Vendors have access to a comprehensive dashboard where they
                  can manage their products, view sales analytics, handle
                  customer inquiries, and more. This feature-rich dashboard
                  simplifies vendor management and improves efficiency.
                </li>
                <li>
                  <h5 className="text-primary-700">Order Management </h5>
                </li>
                <li className="text-xl/8 text-balance">
                  Orion integrate full order processing which is the process of
                  tracking an order from the initial purchase transaction,
                  through the entire fulfillment process, to the point a
                  customer receives their goods.
                </li>
                <li>
                  <h5 className="text-primary-700">Marketplace Analytics</h5>
                </li>
                <li className="text-xl/8 text-balance">
                  Orion allows sellers to gain detailed insights into every
                  aspect of their business. By collecting data on sales
                  performance, customer behavior, product rankings, and other
                  key metric in order to give sellers a comprehensive
                  understanding of their market environment and enables them to
                  make data-driven decisions that improve their bottom line.
                </li>

                <li>
                  <h5 className="text-primary-700">Payment managment </h5>
                </li>
                <li className="text-xl/8 text-balance">
                  Sellers can create payout request to get their money through
                  paypal account.
                </li>
              </ul>
            </div>
          </>
        )}
        {showContent === "installation" && (
          <>
            <div className="flex flex-col gap-y-4">
              <h4>Installation</h4>

              <p className="text-xl/8 text-balance">
                Follow this setup to install in your computer.
              </p>
              <ul className="flex flex-col space-y-4">
                <li>
                  <h5 className="text-primary-700 py-4">
                    Download the source code
                  </h5>
                </li>
                <li className="text-xl/8 text-balance">
                  &nbsp; You probably bought this app from
                  <Link href="https://www.patreon.com/c/sylvaincodes">
                    Patreon
                  </Link>
                  .
                </li>

                <li className="text-xl/8 text-balance">
                  &nbsp; Now you need to run the project on localhost or maybe
                  deploy it in a cloud service .
                </li>

                <li>
                  <h5 className="text-primary-700 py-4">Localhost </h5>
                  <span>Edit .env file</span>
                </li>

                <li>
                  <h6 className="text-primary-700">Store front</h6>
                </li>

                <li>
                  <pre className="w-xs h-[400px] bg-slate-100 text-white rounded-md p-6 overflow-auto">
                    <code className="text-slate-800">
                      <p className="text-gray-500">The url of the project</p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_SERVER_URL
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;http://localhost:3000&apos;
                      </strong>
                      ;
                      <br />
                      <br />
                      <p className="text-gray-500">
                        The url of the api project
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_API_URL
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;http://localhost:3001&apos;
                      </strong>
                      ; <br />
                      <br />
                      <p className="text-gray-500">
                        The api public key for clerk
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put clerk public key&apos;
                      </strong>
                      ; <br />
                      <br />
                      <p className="text-gray-500">
                        The api secret key fro clerk
                      </p>
                      <span className="text-primary-600">CLERK_SECRET_KEY</span>
                      =
                      <strong className="text-green-800">
                        &apos;put clerk secret key&apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">
                        The api public key for stripe
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put stripe public key&apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">
                        The api secret key for stripe
                      </p>
                      <span className="text-primary-600">
                        STRIPE_SECRET_KEY
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put stripe secret key&apos;
                      </strong>
                      ; <br /> <br />
                    </code>
                  </pre>
                </li>

                <li>
                  <h6 className="text-primary-700 pt-4">
                    Api backend and Admin front
                  </h6>
                </li>

                <li>
                  <pre className="w-xs h-[400px] bg-slate-100 text-white rounded-md p-6 overflow-auto">
                    <code className="text-slate-800">
                      <p className="text-gray-500">The url of the project</p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_SERVER_URL
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;http://localhost:3001&apos;
                      </strong>
                      ;
                      <br />
                      <br />
                      <p className="text-gray-500">
                        The url of the api project
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_API_URL
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;http://localhost:3001&apos;
                      </strong>
                      ; <br />
                      <br />
                      <p className="text-gray-500">
                        The success url which is used by stripe callback
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_CLIENT_URL
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;http://localhost:3000&apos;
                      </strong>
                      ; <br />
                      <br />
                      <p className="text-gray-500">
                        The api public key fro clerk
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put clerk public key&apos;
                      </strong>
                      ; <br />
                      <br />
                      <p className="text-gray-500">
                        The api secret key fro clerk
                      </p>
                      <span className="text-primary-600">CLERK_SECRET_KEY</span>
                      =
                      <strong className="text-green-800">
                        &apos;put clerk secret key&apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">
                        The api public key for stripe
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put stripe public key&apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">
                        The api secret key for stripe
                      </p>
                      <span className="text-primary-600">
                        STRIPE_SECRET_KEY
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put stripe secret key&apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">The mongo db url</p>
                      <span className="text-primary-600">MONGODB_URI</span>=
                      <strong className="text-green-800">
                        &apos;put mongo db database url&apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">
                        The google email for newsletter
                      </p>
                      <span className="text-primary-600">
                        NEXT_PUBLIC_GOOGLE_MY_EMAIL
                      </span>
                      =
                      <strong className="text-green-800">
                      &apos;put google email &apos;
                      </strong>
                      ; <br /> <br />
                      <p className="text-gray-500">
                        The password for your email application.
                      </p>
                      <span className="text-primary-600">
                        GOOGLE_PASSWORD_APP
                      </span>
                      =
                      <strong className="text-green-800">
                        &apos;put google account password for application&apos;
                      </strong>
                      ; <br />
                    </code>
                  </pre>
                </li>

                <li>
                  <h5 className="text-primary-700">Vercel</h5>
                </li>

                <li>
                  Watch the video on
                  <Link href="https://www.patreon.com/sylvaincodes">
                    Patreon
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
        {showContent === "configuration" && (
          <>
            <div className="flex">coming up</div>
          </>
        )}
      </section>
    </section>
  );
}
