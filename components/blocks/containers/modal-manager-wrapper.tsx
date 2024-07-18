"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ModalManager = dynamic(() => import("@/components/modal-manager"), {
  ssr: false,
});

export function ModalManagerWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <ModalManager shouldOpen={true} />;
}
