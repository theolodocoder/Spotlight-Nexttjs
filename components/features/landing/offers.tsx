"use client";
import { motion } from "framer-motion";
import spotlightWeb from "@/public/assets/spotlight_webapp.png";
import Image from "next/image";
const Offers = () => {
  return (
    <div className="bg-gradient-to-b from-white to-yellow w-full h-full xl:min-h-screen flex flex-col items-center justify-between pt-20">
      <div className="w-[95%] md:w-[85%] flex flex-col pt-20 px-4 md:px-8">
        {/* First Text Block */}
        <motion.div
          className="text-black text-center xl:text-justify text-xl sm:text-2xl md:text-4xl w-full flex justify-start mb-10 xl:-mb-20 font-semibold"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-[750px] text-center xl:text-left xl:leading-[45px]">
            We get it – everyone&apos;s got their own unique flavour, interests,
            and values.
          </div>
        </motion.div>

        {/* SVG Container */}
        <motion.div
          className="flex justify-center relative my-10 hidden xl:flex"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <svg
            viewBox="0 0 154 102"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[154px] h-[100px] xl:w-[234px] xl:h-[202px] -ml-40"
          >
            <motion.path
              d="M3.5 3H61.5C72.5457 3 81.5 11.9543 81.5 23V79C81.5 90.0457 90.4543 99 101.5 99H151.5"
              stroke="#888"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.circle
              cx="151"
              cy="99"
              r="3"
              fill="#888"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            />
            <motion.circle
              cx="3"
              cy="3"
              r="3"
              fill="#888"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 1.5 }}
            />
          </svg>
        </motion.div>

        {/* Second Text Block */}
        <motion.div
          className="text-[#505050] text-center xl:text-justify text-xl md:text-3xl flex w-full justify-end py-5 xl:py-0 xl:-mt-32 xl:pl-20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="max-w-[700px] sm:leading-[45px] text-center xl:text-left">
            We will connect you with products that fit your lifestyle and make
            your shopping experience smooth and personal.
          </div>
        </motion.div>
      </div>

      {/* Image Section */}
      <motion.div
        className="xl:pt-26 w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Image
          src={spotlightWeb}
          alt="Spotlight"
          className="w-full max-w-full -mb-28 xl:-mb-64"
        />
      </motion.div>
    </div>
  );
};

export default Offers;
