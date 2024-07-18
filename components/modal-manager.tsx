"use client";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useProductDetails } from "@/hooks/api/use-product-data";
import notify from "@/services/notification-service/notification.service";
import { IProduct, TEvent } from "@/types";
import dynamic from "next/dynamic";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";

const ProductDetails = dynamic(
  () => import("@/components/products/product-details")
);

interface ModalManagerProps {
  shouldOpen: boolean;
}

export default function ModalManager({ shouldOpen }: ModalManagerProps) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const storeName = searchParams.get("storeName");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { productData } = useProductDetails();

  useEffect(() => {
    if (shouldOpen) {
      setOpen(true);
    }
  }, [shouldOpen]);

  useEffect(() => {
    const handleNotify = async () => {
      if (open && productData) {
        await notify(TEvent.VIEWED, {
          storeUsername:
            pathname === "/explore" ? productData.store.username : storeName,
          productId: productData.id,
          productName: productData.name,
        });
      }
    };
    handleNotify();
  }, [open, pathname, productData, storeName]);

  const ModalContent = () => <ProductDetails item={productData} />;

  return (
    <>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <ModalContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <ModalContent />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
