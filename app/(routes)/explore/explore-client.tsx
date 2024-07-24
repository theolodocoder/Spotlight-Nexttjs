"use client";

import Container from "@/components/features/landing/container";
import Footer from "@/components/blocks/layout/footer";
import ErrorOccured from "@/components/error";
import Gallery from "@/components/gallery";
import SpinnerLoader from "@/components/loaders/spinner-loader";
import Logo from "@/components/common/logo";
import { API_URL } from "@/constants/api";
import { useRecommendedProducts } from "@/hooks/api/use-recommended-products";
import { useAutoComplete } from "@/hooks/use-autocomplete";
import axios from "axios";
import { useEffect, useRef } from "react";
import { FaHeart } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import Image from "next/image";
import { IProduct } from "@/types";
import { RecommendedProductsResponse } from "@/lib/api";

export default function ExploreClient({
  initialProducts,
}: {
  initialProducts: RecommendedProductsResponse;
}) {
  const {
    textValue,
    bindInput,
    bindOptionsKey,
    bindOptionsStores,
    bindOptionKey,
    bindOptionStore,
    isBusy,
    suggestions,
    setSuggestions,
    selectedIndex,
    isProductError,
    isProductLoading,
    productsByKeyword,
  } = useAutoComplete({
    delay: 1000,
    source: async (search: string) => {
      try {
        const res = await axios.get(
          `${API_URL}/api/v1/stores/explore?name=${search}`
        );
        const keywords = await res.data.data.keywords;
        const stores = await res.data.data.stores;
        return {
          keywords,
          stores,
        };
      } catch (e) {
        return [];
      }
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setSuggestions({
          keywords: [],
          stores: [],
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSuggestions]);

  // const {
  //   data: store,
  //   error,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useRecommendedProducts(initialProducts);

  // if (isError || isProductError) {
  //   return <ErrorOccured error={error} onRetry={refetch} />;
  // }

  // if (isLoading || isProductLoading) {
  //   return <SpinnerLoader delay={0} timeout={15000} />;
  // }

  // const products = store?.data || initialProducts;

  const products = initialProducts?.data;

  return (
    <>
      <Container>
        <div className="block py-5">
          <Logo url="/" />
        </div>
      </Container>

      <div className="relative z-50 flex flex-col items-center justify-center gap-y-10 md:gap-y-20 py-5 md:py-10 h-[250px] md:min-h-[350px] bg-[url('/assets/explore-header.png')] bg-cover bg-white/30 backdrop-filter backdrop-blur-md">
        <h1 className="flex items-center text-center md:gap-x-2 text-2xl md:text-4xl font-semibold max-w-[300px] md:max-w-full">
          Find products and brands you love
          <FaHeart className="hidden md:block" />
        </h1>
        <div
          ref={containerRef}
          className="relative w-[90%] md:w-[50%] mx-auto z-50"
        >
          <div className="flex items-center border bg-white border-gray-300 p-3 sm:p-4 rounded-full text-gray-500">
            <LuSearch size={20} className="flex-shrink-0" />
            <input
              placeholder="Search"
              className="flex-grow outline-none bg-transparent ml-2"
              {...bindInput}
            />
          </div>
          {textValue && (
            <div
              className="shadow-lg w-full bg-white scroll-smooth absolute left-0 top-full mt-2 max-h-[260px] overflow-x-hidden overflow-y-auto rounded-xl z-10"
              style={{
                zIndex: 99,
              }}
            >
              {isBusy && (
                <div className="z-50 w-4 h-4 border-2 border-dashed rounded-full border-gray-500 animate-spin mx-auto my-5"></div>
              )}
              {suggestions.keywords && (
                <ul {...bindOptionsKey} id="keywordsList">
                  {suggestions.keywords.map((keyword, index) => (
                    <li
                      className={`z-50 flex items-center h-[40px] p-2 hover:bg-gray-200 cursor-pointer py-2 gap-x-2 ${
                        selectedIndex === index ? "bg-gray-200" : ""
                      }`}
                      key={index}
                      id={`keywordListItem-${index}`}
                      {...bindOptionKey}
                    >
                      <LuSearch size={20} />
                      {keyword.name}
                    </li>
                  ))}
                </ul>
              )}
              {suggestions.stores && (
                <ul {...bindOptionsStores} id="storesList">
                  {suggestions.stores.map((store, index) => (
                    <li
                      className={`z-50 flex items-center h-[40px] p-2 hover:bg-gray-200 cursor-pointer py-2 gap-x-2 ${
                        selectedIndex === index ? "bg-gray-200" : ""
                      }`}
                      key={index}
                      id={`storeListItem-${index}`}
                      {...bindOptionStore}
                    >
                      <Image
                        src={store.logo}
                        alt={store.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {store.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="w-full min-h-[700px] mx-auto pb-10 relative bg-transparent">
        <div className="mx-auto w-full md:w-[90%]">
          <Gallery
            products={
              productsByKeyword?.data?.length > 0
                ? productsByKeyword.data
                : products
            }
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
