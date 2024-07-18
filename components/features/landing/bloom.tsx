"use client";
import bloomApp from "@/public/assets/bloom.png";
import playStore from "@/public/assets/playstore.svg";
import apple from "@/public/assets/apple.svg";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Bloom = () => {
  return (
    <motion.div
      className="bg-black w-full xl:w-[90%] mx-auto rounded-tr-[20px] rounded-tl-[20px] py-8 md:h-[500px] mb-[.5px] xl:mb-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex flex-col md:flex-row gap-x-5 justify-between items-center text-white w-[80%] mx-auto h-full">
        <motion.div
          className="flex flex-col gap-y-6 md:gap-y-10 max-w-[600px]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold">
            Got a business or brand?
          </h1>
          <p className="text-lg md:text-xl">
            Download the <span className="text-[#8C52FF]">Bloom</span> app and
            get your customized spotlight page immediately.
          </p>
          <div className="flex gap-4 md:gap-x-5">
            <Button className="bg-white hover:bg-gray-200 px-4 rounded-lg text-black space-x-2 py-6">
              <Image src={apple} alt={"apple logo"} className="w-6 h-6" />
              <span className="text-sm xl:text-base">Get on Iphone</span>
            </Button>
            <Button className="bg-white hover:bg-gray-200 px-4 rounded-lg text-black space-x-2 py-6">
              <Image
                src={playStore}
                alt={"playstore logo"}
                className="w-6 h-6"
              />
              <span className="text-sm xl:text-base">Get on Android</span>
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="mt-8 md:mt-0 md:absolute md:-bottom-10 md:right-0"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Image
            src={bloomApp}
            alt="Bloom mobile app"
            className="max-w-full h-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Bloom;
