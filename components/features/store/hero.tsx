"use client";
import { Store } from "@/types";
import { Dot } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import { VscWand } from "react-icons/vsc";
import IconWithText from "@/components/common/icon-with-text";
import ShopLogo from "@/components/common/shop-logo";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/getWhatsappLink";
import { toast } from "@/components/ui/use-toast";

interface IHeroProps {
  store: Store;
}

function Hero({ store }: IHeroProps) {
  const message =
    "Hey there! 👋 I just spotted your awesome store on Spotlight and couldn't resist checking it out. 🛍️✨ I'm really interested in one of your products. Can we chat about it? 😊 #SpotlightShopper";
  const handleSendMessage = () => {
    const whaLink = getWhatsAppLink(store.phoneNumber || "no-link", message);
    if (whaLink == "no-link") {
      toast({
        description: "No Phone Number",
      });
      return;
    }
    window.open(whaLink, "_blank");
  };

  return (
    <div className="pt-32 sm:pt-40 mb-16 flex flex-col items-center justify-center">
      <div className="flex justify-center items-center h-full pb-5 sm:pb-10">
        <ShopLogo logoImg={store.logo} alt={store.name} size={"lg"} />
      </div>
      <div className={"w-full md:max-w-[700px] text-center"}>
        <h1 className="text-2xl sm:text-4xl font-bold">{store.name}</h1>
        <Paragraph>{store.bio}</Paragraph>
        <div className="py-1 sm:py-2 text-center flex flex-col justify-center items-center gap-y-5">
          <div className="flex gap-x-1 items-center">
            {store.phoneNumber && (
              <IconWithText text={store.phoneNumber}>
                <p className="text-xs text-gray-400">{store.phoneNumber}</p>
              </IconWithText>
            )}
            {store.phoneNumber && store.email && (
              <Dot className="mb-1 text-gray-400" />
            )}
            <IconWithText text={store.email}>
              <p className="text-xs text-gray-400">{store.email}</p>
            </IconWithText>
          </div>

          <div className="grid grid-cols-2 items-center w-full md:w-auto gap-x-2 md:gap-x-5">
            <Button
              className="flex gap-x-2 items-center rounded-full  text-xs md:text-base"
              size={"lg"}
            >
              <VscWand size={18} className="hidden md:block" />
              Get business card
            </Button>
            <Button
              className="flex gap-x-2 items-center rounded-full text-xs md:text-base"
              size={"lg"}
              variant="outline"
              onClick={handleSendMessage}
            >
              <BsWhatsapp size={18} className="hidden md:block" />
              Send a Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Paragraph({ children }: { children: string }) {
  return (
    <p className="text-[#555] leading-7 text-sm sm:text-base pt-2 pb-1">
      {children}
    </p>
  );
}

export default Hero;
