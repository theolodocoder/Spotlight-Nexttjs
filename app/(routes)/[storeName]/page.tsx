import SpinnerLoader from "@/components/loaders/spinner-loader";
import { getStore } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import StoreClient from "./store-client";
import Footer from "@/components/blocks/layout/footer";
import ProductGallery from "@/components/features/store/product-gallery";
import TopSection from "@/components/features/store/top-section";
import NoProducts from "@/components/no-products";
import Container from "@/components/features/landing/container";
type Props = {
  params: { storeName: string };
  searchParams: { productId?: string };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const storeName = params.storeName;
  const store = await getStore(storeName);

  return {
    title: `${store.name} - Online Store`,
    description: `Shop the latest products from ${store.name}. Find unique items and great deals.`,
    openGraph: {
      title: `${store.name} - Online Store`,
      description: `Shop the latest products from ${store.name}. Find unique items and great deals.`,
      images: [store.logo || "/default-store-image.jpg"],
      url: `https://myspotlight.com/${storeName}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${store.name} - Online Store`,
      description: `Shop the latest products from ${store.name}. Find unique items and great deals.`,
      images: [store.logo || "/default-store-image.jpg"],
    },
  };
}

export default async function Home({ params }: Props) {
  const store = await getStore(params.storeName);

  return (
    // TODO: Implement Page Loader
    <Suspense fallback={<SpinnerLoader delay={50} timeout={5000} />}>
      <div>
        <Container>
          <TopSection store={store} />
        </Container>
        {store.products.length === 0 ? (
          <NoProducts />
        ) : (
          <ProductGallery
            products={store.products}
            categories={store.categories}
          />
        )}
        <Footer />
      </div>
    </Suspense>
  );
}
