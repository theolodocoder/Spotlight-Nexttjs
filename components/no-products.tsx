import NoProdImg from "@/public/assets/empty_states/product_img.svg";
import Image from "next/image";

const NoProducts = () => {
  return (
    <div className="flex md:items-center justify-center pb-10 sm:py-0 h-auto sm:h-[600px]">
      <div className="text-center space-y-10">
        <div className="w-44 md:w-64 mx-auto">
          <Image src={NoProdImg} alt="empty product" />
        </div>
        <h2 className="text-xl md:text-3xl font-base mb-8 text-gray-400">
          No Products Available
        </h2>
      </div>
    </div>
  );
};

export default NoProducts;
