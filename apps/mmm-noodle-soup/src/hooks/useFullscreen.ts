import { useEffect, useState, useCallback } from "react";
import { useFullscreenContext } from "../contexts/FullscreenContext";

interface UseFullscreenOptions {
  onEnter?: () => void;
  onExit?: () => void;
  preventScreenOff?: boolean;
}

export const useFullscreen = (options: UseFullscreenOptions = {}) => {
  const { isFullscreen, setFullscreen } = useFullscreenContext();
  const [wakeLock, setWakeLock] = useState<WakeLockSentinel | null>(null);

  const enterFullscreen = useCallback(async () => {
    try {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        await (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        await (element as any).msRequestFullscreen();
      }

      setFullscreen(true);
      options.onEnter?.();

      // Request wake lock if supported and requested
      if (options.preventScreenOff && "wakeLock" in navigator) {
        try {
          const wakeLockSentinel = await (navigator as any).wakeLock.request(
            "screen"
          );
          setWakeLock(wakeLockSentinel);
        } catch (err) {
          console.warn("Wake Lock request failed:", err);
        }
      }
    } catch (err) {
      console.error("Error entering fullscreen:", err);
    }
  }, [options]);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }

      setFullscreen(false);
      options.onExit?.();

      // Release wake lock if active
      if (wakeLock) {
        try {
          await wakeLock.release();
          setWakeLock(null);
        } catch (err) {
          console.warn("Wake Lock release failed:", err);
        }
      }
    } catch (err) {
      console.error("Error exiting fullscreen:", err);
    }
  }, [options, wakeLock]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
      setFullscreen(isCurrentlyFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );

      // Clean up wake lock on unmount
      if (wakeLock) {
        wakeLock.release().catch(console.warn);
      }
    };
  }, [wakeLock]);

  return {
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen: isFullscreen ? exitFullscreen : enterFullscreen,
  };
};
