import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NoPageFoundSvg from "@/public/assets/empty_states/404.svg";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="px-2 flex flex-col justify-center items-center h-dvh text-center gap-y-10">
      <div className="space-y-3">
        <h1 className="text-7xl sm:text-9xl font-bold m-0">404</h1>
        <p className="text-md sm:text-lg text-gray-500">
          You seem lost, click the button below to go back to the home page
        </p>
      </div>
      <Button size="lg" className="rounded-full z-50">
        <Link href="/">Go Home</Link>
      </Button>
      <div className="max-h-[500px] pt-5 -m-24">
        <Image
          src={NoPageFoundSvg}
          alt="page_not_found"
          className="max-w-full max-h-full"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
