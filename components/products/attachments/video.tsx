"use client";
import { useIsVisible } from "@/hooks/use-is-visible";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import { Blurhash } from "react-blurhash";

type TVideoProps = {
  hash: string;
  src: string;
  poster: string;
  alt?: string;
};

const Video = ({ hash, src, alt, poster }: TVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsLoading, setVideoIsLoading] = useState(true);

  const videoWrapper = useRef<HTMLDivElement>(null);
  const videoIsVisibleOnScreen = useIsVisible({
    ref: videoWrapper,
    rootMargin: "300px",
  });

  const handleMouseEnter = debounce(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, 200);

  const handleMouseLeave = debounce(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.poster = poster;
    }
  }, 200);

  const afterLoad = useCallback(() => {
    setVideoIsLoading(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const resetVideo = () => {
        if (video.currentTime >= 2) {
          video.currentTime = 0;
        }
      };
      video.addEventListener("timeupdate", resetVideo);
      video.loop = true;

      return () => {
        video.removeEventListener("timeupdate", resetVideo);
      };
    }
  }, []);

  return (
    <div className="w-full h-full" ref={videoWrapper}>
      {hash && videoIsLoading && (
        <Blurhash hash={hash} width="100%" height="100%" />
      )}
      {videoIsVisibleOnScreen && (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: videoIsLoading ? 0 : 1 }}
          transition={{ opacity: { delay: 0.5, duration: 0.4 } }}
          ref={videoRef}
          loop
          muted
          // preload="none"
          playsInline
          controlsList="nodownload"
          disableRemotePlayback
          poster={poster}
          aria-label={alt}
          onLoadedData={afterLoad}
          className="h-full w-full object-cover object-center"
          onMouseEnter={() => handleMouseEnter()}
          onMouseLeave={() => handleMouseLeave()}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag. Please try viewing this
          page in a modern browser.
        </motion.video>
      )}
    </div>
  );
};

export default Video;
