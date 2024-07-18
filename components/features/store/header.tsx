"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { SearchIcon } from "lucide-react";
import { FaRegCompass } from "react-icons/fa";
import ShopLogo from "@/components/common/shop-logo";
import { Button } from "@/components/ui/button";

type THeaderProps = {
  logoImg: string;
  name: string;
};

function Header({ logoImg, name }: THeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputVal, setInputVal] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Create a debounced version of search update
  const debouncedSearch = debounce((value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) {
      current.set("search", value);
    } else {
      current.delete("search");
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${window.location.pathname}${query}`);
  }, 300);

  // Update the debounced search term whenever inputVal changes
  useEffect(() => {
    debouncedSearch(inputVal);
    // Cleanup function to cancel the debounce on unmount
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputVal, debouncedSearch]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(event.target.value);
  };

  return (
    <div
      className={`fixed left-0 bg-white w-full z-20 py-2 ${
        scrolled && "border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <ShopLogo logoImg={logoImg} alt="Shop logo" size="sm" />
          {/* Search Bar */}
          <div
            id="search__bar"
            className="w-[60%] md:max-w-[800px] flex items-center gap-x-5 mx-auto border hover:border-gray-400 rounded-full border-gray-300 py-2 sm:py-3 px-4"
          >
            <input
              type="search"
              name="search"
              id="search__input"
              value={inputVal}
              placeholder={`Search ${name} Stores`}
              className="appearance-none bg-transparent w-full h-full outline-none text-xs"
              onChange={handleSearchChange}
            />
            <SearchIcon className="text-gray-300 hover:text-gray-400 cursor-pointer" />
          </div>
          {/* Explore Button  */}
          <Link href="/explore" passHref>
            <Button
              className="flex items-center gap-x-2 rounded-full p-3 sm:px-5"
              variant="default"
            >
              <FaRegCompass
                size={18}
                className="cursor-pointer block mb-[0.5px]"
              />
              <p className="hidden sm:block text-xs sm:text-sm">Explore</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
