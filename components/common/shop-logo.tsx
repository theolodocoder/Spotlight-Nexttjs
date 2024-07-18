"use client";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";

const shopLogoVariants = cva(
  "rounded-full overflow-hidden flex items-center justify-center",
  {
    variants: {
      size: {
        default: "w-40 h-40",
        sm: "w-10 h-10",
        lg: "sm:w-52 sm:h-52 w-36 h-36 border-4 border-black",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface ShopLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof shopLogoVariants> {
  logoImg: string;
  alt: string;
}

const ShopLogo: React.FC<ShopLogoProps> = ({
  className,
  size,
  logoImg,
  alt,
  ...props
}) => {
  return (
    <div className={cn(shopLogoVariants({ size, className }))} {...props}>
      <Image
        src={logoImg}
        alt={`${alt}-logo-image`}
        className="object-cover w-full h-full"
        width={100}
        height={100}
      />
    </div>
  );
};

export default ShopLogo;
