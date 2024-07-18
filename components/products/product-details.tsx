"use client";

import ShopLogo from "@/components/common/shop-logo";
import { trimAndCapitalize } from "@/lib/trimAndCapitalize";
import { AttachmentType, CurrencyToSymbolMapping, IProduct } from "@/types";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { VscWand } from "react-icons/vsc";
import { Button } from "../ui/button";
import ImageDetail from "./attachments/image-detail";
import VideoDetail from "./attachments/video-detail";
import Share from "./share";

type TProductDetailsProps = {
  item: IProduct;
};

const ProductDetails = ({ item }: TProductDetailsProps) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const attachmentType = item.attachments[0].type;
  const _storeName =
    pathname === "/explore" ? item.store.username : params.storeName;
  const shareUrl = `${window.location.origin}/${_storeName}/shared/${item.id}`;

  const downloadImage = (imageUrl: string) => {
    setLoading(true);
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "bloom_main.png"; // or any other name you want
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="sm:grid grid-cols-[60%,40%] h-full border-0 ">
        <div className="w-full h-full relative mb-5 sm:mb-0">
          {attachmentType === AttachmentType.VIDEO ? (
            <VideoDetail
              src={item.attachments[0].url}
              alt={item.name}
              hash={item.attachments[0].blurHash}
            />
          ) : (
            <ImageDetail
              productName={item.name}
              attachments={item.attachments}
            />
          )}

          {/* <InStock /> */}
        </div>
        <div className="w-[90%] md:container mx-auto text-justify block sm:flex flex-col justify-center space-y-3 md:space-y-5">
          {pathname === "/explore" && (
            <div className="flex self-start items-center gap-x-2">
              <ShopLogo
                size={"sm"}
                logoImg={item.store.logo}
                alt="d"
                className={"w-6 h-6 sm:w-8 sm:h-8"}
              />
              <Link href={`/${item.store.username}`}>
                <p className="text-xs sm:text-sm hover:underline cursor-pointer">
                  {trimAndCapitalize(item.store.name)}
                </p>
              </Link>
            </div>
          )}

          <div>
            <p className="text-xl sm:text-2xl">
              {trimAndCapitalize(item.name)}
            </p>
            <p className="text-[#222] text-sm sm:text-md leading-6 py-2">
              {trimAndCapitalize(item.description)}
            </p>
          </div>

          <div className="flex items-center text-[#222]  text-3xl sm:text-3xl gap-x-3">
            <p>
              {CurrencyToSymbolMapping[item.currency]} {item?.price}
            </p>
          </div>
          <div className="w-full grid grid-cols-2 items-center  pb-5 gap-x-2">
            <Button
              className="items-center gap-x-3 rounded-full p-0"
              size={"lg"}
              onClick={() => downloadImage(item?.card)}
            >
              <VscWand size={18} className="hidden md:block" />
              {loading ? "..." : "Download Card"}
            </Button>
            <Share
              shareUrl={shareUrl}
              storeName={params.storeName as string}
              item={item}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
