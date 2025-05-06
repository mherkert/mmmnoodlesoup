import React from "react";
import { useFullscreen } from "../hooks/useFullscreen";
import { Button } from "./buttons/Button";
import { faCompress, faExpand } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      className={`relative ${className} ${
        isFullscreen ? "fixed inset-0 overflow-hidden" : ""
      }`}
    >
      <Button
        onClick={toggleFullscreen}
        className={`md:hidden fixed z-50 shadow-lg right-2 ${isFullscreen ? "bottom-2" : "bottom-7"}`}
        aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? (
          <FontAwesomeIcon aria-hidden icon={faCompress} />
        ) : (
          <FontAwesomeIcon aria-hidden icon={faExpand} />
        )}
      </Button>
      {isFullscreen ? fullscreenContent : defaultContent}
    </div>
  );
};
