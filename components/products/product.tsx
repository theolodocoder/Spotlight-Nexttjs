"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import notify from "@/services/notification-service/notification.service";
import { AttachmentType, IProduct, TEvent } from "@/types";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { Dialog, DialogContent } from "../ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import ProductDetails from "./product-details";
import ProductSingle from "./product-single";
import { usePathname, useParams } from "next/navigation";

type Props = {
  item: IProduct;
};

function Product({ item }: Props) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const params = useParams();
  const pathname = usePathname();

  useEffect(() => {
    const handleNotify = async () => {
      if (open) {
        await notify(TEvent.VIEWED, {
          storeUsername:
            pathname === "/explore" ? item.store.username : params.storeName,
          productId: item.id,
          productName: item.name,
        });
      }
    };
    handleNotify();
  }, [open, item, params.storeName, pathname]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <ProductSingle item={item} handleClick={(val) => setOpen(val)} />
        <DialogContent className="sm:max-w-[1000px] p-0 overflow-hidden">
          <ProductDetails item={item} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <ProductSingle item={item} handleClick={(val) => setOpen(val)} />
      </DrawerTrigger>
      <DrawerContent>
        <ProductDetails item={item} />
      </DrawerContent>
    </Drawer>
  );
}

export function ProductIcon({
  type,
  size,
}: {
  type: AttachmentType;
  size: number;
}) {
  if (type === AttachmentType.PICTURE && size <= 1) {
    return null;
  }
  return (
    <div className="text-white text-xl">
      {type === AttachmentType.PICTURE ? null : <FaPlay />}
    </div>
  );
}

export default Product;
