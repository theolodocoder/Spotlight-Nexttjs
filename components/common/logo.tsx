"use client";
import Link from "next/link";
import Image from "next/image";
import LogoImg from "@/public/assets/Horizontally stacked black text and yellow-black icon 2.svg";

type TLogoProps = {
  url: string;
};
const Logo: React.FC<TLogoProps> = ({ url }) => {
  return (
    <>
      <Link href={url}>
        <Image src={LogoImg} alt="spotlight logo" className="w-24 sm:w-32" />
      </Link>
    </>
  );
};

export default Logo;
