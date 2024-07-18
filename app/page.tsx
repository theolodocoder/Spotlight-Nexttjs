import Footer from "@/components/blocks/layout/footer";
import { Container } from "@/components/common/container";
import Bloom from "@/components/features/landing/bloom";
import Committed from "@/components/features/landing/committed";
import HeroSection from "@/components/features/landing/hero";
import Navbar from "@/components/features/landing/navbar";
import Offers from "@/components/features/landing/offers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Spotlight",
  description: "Find the products and brands you love, easily and fast.",
};

export default function LandingPage() {
  return (
    <>
      <Container>
        <Navbar />
        <HeroSection />
      </Container>
      <Offers />
      <Committed />
      <Bloom />
      <Footer isLanding={true} />
    </>
  );
}
