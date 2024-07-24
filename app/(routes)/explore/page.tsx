import { Metadata } from "next";
import ExploreClient from "./explore-client";
import { getRecommendedProducts } from "@/lib/api";

export const metadata: Metadata = {
  title: "Explore Products and Brands You Love",
  description:
    "Discover and explore a wide range of products and brands you'll love",
  openGraph: {
    title: "Explore Products and Brands You Love",
    description:
      "Discover and explore a wide range of products and brands you'll love.",
    images: [
      {
        url: "/images/explore-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Explore Products and Brands",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Products and Brands You Love",
    description:
      "Discover and explore a wide range of products and brands you'll love.",
    images: ["/images/explore-og-image.jpg"],
  },
};

export default async function ExplorePage() {
  const initialProducts = await getRecommendedProducts();

  return <ExploreClient initialProducts={initialProducts} />;
}
