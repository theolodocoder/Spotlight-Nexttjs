"use client";
import { useIsVisible } from "@/hooks/use-is-visible";
import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";

type TImageProps = {
  hash: string;
  src: string;
  alt: string;
  styles?: string;
};

const Image = ({ hash, src, alt, styles }: TImageProps) => {
  const [imgIsLoading, setImgIsLoading] = useState(true);
  const imgWrapper = useRef<HTMLDivElement>(null);
  const isImageVisibleOnScreen = useIsVisible({
    ref: imgWrapper,
    rootMargin: "300px",
  });

  const afterLoad = useCallback(() => {
    setImgIsLoading(false);
  }, []);

  return (
    <div className="h-full w-full" ref={imgWrapper}>
      {hash && imgIsLoading && (
        <Blurhash hash={hash} width="100%" height="100%" />
      )}
      {isImageVisibleOnScreen && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: imgIsLoading ? 0 : 1 }}
          onLoad={afterLoad}
          className={styles}
          src={src}
          alt={alt}
          loading="lazy"
          width="100%"
          height="100%"
        />
      )}
    </div>
  );
};

export default Image;
