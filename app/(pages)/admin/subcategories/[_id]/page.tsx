import Container from "@/components/custom/Container";
import SubCategoryForm from "@/components/modules/admin/subcategories/SubCategoryForm";
import React from "react";

// Nextjs ISR caching strategy
export const revalidate = false;

export default async function page({ params }: { params: { _id: string } }) {
  const { _id } = await params;
  return (
    <section className="py-10">
      <Container>
        <SubCategoryForm _id={_id} />
      </Container>
    </section>
  );
}

// Nextjs dynamic metadata
export function generateMetadata() {
  return {
    title: `SubCategories - Edit`,
    description: `Page - Description here`,
    icons: {
      icon: `path to asset file`,
    },
  };
}
