import Image from "next/image";
import { Container } from "@/components/common/container";
import SpotlightLogoWhite from "@/public/assets/spotlight-white.svg";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = ({ isLanding }: { isLanding?: boolean }) => {
  return (
    <footer className="py-5 bg-black text-white">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">
          <div className="flex items-center gap-x-3 order-1 md:order-1">
            {!isLanding && <span className="text-xs">Powered By</span>}
            <Image
              src={SpotlightLogoWhite}
              alt="white variant of the spotlight logo"
              className="mb-1 h-5 md:h-6" // Adjust height as needed
            />
          </div>

          <div className="flex items-center gap-x-3 order-2 md:order-3">
            <FaInstagram className="text-lg md:text-xl hover:text-gray-300 cursor-pointer" />
            <FaLinkedin className="text-lg md:text-xl hover:text-gray-300 cursor-pointer" />
            <FaXTwitter className="text-lg md:text-xl hover:text-gray-300 cursor-pointer" />
          </div>

          <div className="text-xs md:text-sm text-center order-3 md:order-2">
            Copyright © 2024 Beetle Ltd. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
