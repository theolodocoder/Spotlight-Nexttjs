import { IShareMedium } from "@/constants/data-constants";
import Image from "next/image";

const Medium = ({ medium }: { medium: IShareMedium }) => {
  return (
    <div className="flex flex-col items-center gap-y-1 cursor-pointer">
      <div
        className={`w-10 h-10  grid place-items-center rounded-full ${
          medium.name === "Twitter" && "bg-black p-2"
        } ${medium.name === "Copy Link" && "bg-gray-200 p-2"}`}
      >
        <Image
          src={medium.icon}
          alt={medium.name}
          className="max-w-full h-full"
        />
      </div>
      <p className="text-xs">{medium.name}</p>
    </div>
  );
};

export default Medium;
