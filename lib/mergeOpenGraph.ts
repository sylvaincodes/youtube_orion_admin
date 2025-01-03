import type { Metadata } from "next";

// Default open graph
const defaultOpenGraph: Metadata["openGraph"] = {
  title: "Orion - Ecommerce platform for selling Electronics",
  description: "Orion - Ecommerce platform for selling Electronics",
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/assets/images/og2.png`,
    },
  ],
  type: "website",
  url: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  siteName: "Orion",
};

// Dynamic open graph
export const mergeOpenGraph = (og?: Metadata["openGraph"]) => {
  return {
    ...defaultOpenGraph,
    ...og,
    image: og?.images ? og.images : defaultOpenGraph.images,
    title: og?.title ? og.title : defaultOpenGraph.title,
    url: og?.url ? og.url : defaultOpenGraph.url,
  };
};
