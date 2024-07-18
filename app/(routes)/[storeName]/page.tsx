import { Container } from "@/components/common/container";
import Footer from "@/components/blocks/layout/footer";
import ProductGallery from "@/components/features/store/product-gallery";
import TopSection from "@/components/features/store/top-section";
import { getStore } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import NoProducts from "@/components/no-products";
import { ModalManagerWrapper } from "@/components/blocks/containers/modal-manager-wrapper";

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
      url: `https://yourdomain.com/store/${storeName}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${store.name} - Online Store`,
      description: `Shop the latest products from ${store.name}. Find unique items and great deals.`,
      images: [store.logo || "/default-store-image.jpg"],
    },
  };
}

export default async function Home({ params, searchParams }: Props) {
  const store = await getStore(params.storeName);
  const shouldOpenModal = !!searchParams.productId;

  return (
    <Suspense fallback={<SpinnerLoader delay={50} timeout={5000} />}>
      <div>
        {shouldOpenModal && <ModalManagerWrapper />}
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
