"use client";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/public/assets/Horizontally stacked black text and yellow-black icon.svg";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MenuItem } from "@/types";

const menuItems: MenuItem[] = [
  {
    id: 1,
    title: "Bloom",
    href: "https://bloom.beetleltd.org/",
    isCenter: true,
  },
  { id: 2, title: "Explore", href: "/explore", isCenter: true },
  { id: 3, title: "Blog", href: "#", isCenter: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full top-0 left-0 z-50 py-4 md:py-6 backdrop-blur-lg bg-white/75">
      <div className="w-[95%] sm:w-[85%] mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/" aria-label="Home">
            <Image src={Logo} alt="spotlight logo" className="w-28 md:w-36" />
          </Link>
        </motion.div>

        <div className="hidden md:flex items-center justify-center space-x-6">
          {menuItems
            .filter((item) => item.isCenter)
            .map((item) => (
              <NavItem key={item.id} item={item} />
            ))}
        </div>
        <div></div>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-text hover:text-primary transition-colors duration-300 focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && <MobileMenu menuItems={menuItems} toggleMenu={toggleMenu} />}
      </AnimatePresence>
    </nav>
  );
};

const NavItem = ({ item }: { item: MenuItem }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.6, delay: item.id * 0.1, ease: "easeOut" }}
  >
    <Link
      href={item.href}
      className="text-base font-normal text-text hover:text-primary transition-colors duration-300 group relative"
    >
      {item.title}
      <motion.span
        className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
        layoutId="underline"
      />
    </Link>
  </motion.div>
);

const MobileMenu = ({
  menuItems,
  toggleMenu,
}: {
  menuItems: MenuItem[];
  toggleMenu: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg"
  >
    <ul className="space-y-4 p-4 w-[95%] sm:w-[85%] mx-auto">
      {menuItems.map((item) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: item.id * 0.1 }}
        >
          <Link
            href={item.href}
            className="block text-text hover:text-primary transition-colors duration-300 text-base py-2"
            onClick={toggleMenu}
          >
            {item.title}
          </Link>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default Navbar;
