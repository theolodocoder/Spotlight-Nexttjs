"use client";

import { Button } from "@/components/ui/button";
import { useShare } from "@/hooks/use-share";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useMemo, useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { IProduct, AttachmentType } from "@/types";
import dynamic from "next/dynamic";
import Head from "next/head";

const DesktopShare = dynamic(() => import("./desktop-share"), { ssr: false });

type TShareProps = {
  shareUrl: string;
  storeName: string;
  item: IProduct;
};

const Share = ({ shareUrl, item, storeName }: TShareProps) => {
  const [popup, setPopup] = useState(false);
  const imgUrl =
    item.attachments[0].type === AttachmentType.VIDEO
      ? item.attachments[0].pictureUrl
      : item.attachments[0].url;

  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
      ),
    []
  );

  const { mobileShare, handleShare } = useShare(
    shareUrl,
    item,
    storeName,
    imgUrl || ""
  );

  // SEO-friendly description
  const description = `Check out ${item.name} by ${storeName} on our platform. Find unique products easily and fast.`;

  return (
    <>
      <Head>
        <meta property="og:title" content={`${item.name} by ${storeName}`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imgUrl} />
        <meta property="og:url" content={shareUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${item.name} by ${storeName}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imgUrl} />
      </Head>
      {isMobile ? (
        <Button onClick={mobileShare} variant="outline" size="icon">
          <IoShareSocialOutline className="h-4 w-4" />
          <span className="sr-only">Share {item.name}</span>
        </Button>
      ) : (
        <Popover open={popup} onOpenChange={setPopup}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <IoShareSocialOutline className="h-4 w-4" />
              <span className="sr-only">Share {item.name}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <DesktopShare
              closePopUp={() => setPopup(false)}
              handleShare={handleShare}
              item={item}
              shareUrl={shareUrl}
              storeName={storeName}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default Share;
