"use client";

import { motion } from "framer-motion";

const Committed = () => {
  return (
    <div>
      <motion.div
        className="flex container xl:w-full h-[500px] xl:min-h-screen flex-col gap-y-5 items-center justify-center p-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <svg
            width="71"
            height="70"
            viewBox="0 0 71 70"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="35.5" cy="35" r="35" fill="#FEFD03" />
            <path
              d="M36 39C32.95 39 30.0249 37.7883 27.8683 35.6317C25.7116 33.475 24.5 30.55 24.5 27.5C24.5 24.45 25.7116 21.5249 27.8683 19.3683C30.0249 17.2116 32.95 16 36 16C39.05 16 41.975 17.2116 44.1317 19.3683C46.2883 21.5249 47.5 24.45 47.5 27.5C47.5 30.55 46.2883 33.475 44.1317 35.6317C41.975 37.7883 39.05 39 36 39ZM36 33.25C37.525 33.25 38.9875 32.6442 40.0658 31.5658C41.1442 30.4875 41.75 29.025 41.75 27.5C41.75 25.975 41.1442 24.5125 40.0658 23.4341C38.9875 22.3558 37.525 21.75 36 21.75C34.475 21.75 33.0125 22.3558 31.9341 23.4341C30.8558 24.5125 30.25 25.975 30.25 27.5C30.25 29.025 30.8558 30.4875 31.9341 31.5658C33.0125 32.6442 34.475 33.25 36 33.25ZM43.6666 38.5208V54.3333L36 46.6666L28.3333 54.3333V38.5208C30.5799 40.0951 33.2567 40.9397 36 40.9397C38.7433 40.9397 41.4201 40.0951 43.6666 38.5208Z"
              fill="black"
            />
          </svg>
        </motion.div>
        <motion.div
          className="font-medium text-xl sm:text-xl md:text-4xl xl:w-[900px] xl:leading-[50px] text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          We&apos;re committed to helping you find the products and brands you
          love, easily and fast.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Committed;
