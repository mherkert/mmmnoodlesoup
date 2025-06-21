import React from "react";
import { useFullscreen } from "../hooks/useFullscreen";
import classNames from "classnames";

interface FullscreenViewProps {
  fullscreenContent: React.ReactNode;
  defaultContent: React.ReactNode;
  className?: string;
}

export const FullscreenView: React.FC<FullscreenViewProps> = ({
  fullscreenContent,
  defaultContent,
  className,
}) => {
  const { isFullscreen, toggleFullscreen } = useFullscreen({
    preventScreenOff: true,
  });

  return (
    <div
      className={classNames(
        "relative",
        className,
        isFullscreen ? "fixed inset-0 overflow-hidden" : ""
      )}
    >
      {isFullscreen ? fullscreenContent : defaultContent}
    </div>
  );
};
