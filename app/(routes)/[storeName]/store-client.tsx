"use client";
import Footer from "@/components/blocks/layout/footer";
import ProductGallery from "@/components/features/store/product-gallery";
import TopSection from "@/components/features/store/top-section";
import NoProducts from "@/components/no-products";
import { Store } from "@/types";
import { Container } from "lucide-react";

interface StoreClientProps {
  store: Store;
}

const StoreClient: React.FC<StoreClientProps> = ({ store }) => {
  return (
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
  );
};

export default StoreClient;
