import React from "react";
import { Button } from "../buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompress,
  faExpand,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "gatsby";
import { useFullscreen } from "../../hooks/useFullscreen";
import { usePageStore } from "../../store/PageStore";
import { useAuth } from "../../store/authStore";

export const FloatingActionBar = () => {
  const { isFullscreen, toggleFullscreen } = useFullscreen({
    preventScreenOff: true,
  });
  const { isLoading, isAuthenticated } = useAuth();
  const { currentPage } = usePageStore();

  // While loading, simply return nothing
  if (isLoading) {
    return null;
  }
  
  return (
    <div className="lg:hidden fixed bottom-7 right-4 z-50 opacity-90 hover:opacity-100 transition-opacity duration-300">
      <div className="flex flex-col-reverse gap-2">
        {isAuthenticated && !isFullscreen && (
          <Link
            className=" text-white rounded-md bg-primary hover:bg-primary-dark outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white border border-solid border-white text-nowrap hover:bg-primary-light w-9 h-9 text-center flex items-center justify-center"
            to="/recipes/create"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        )}
        {currentPage === "recipe" && (
          <Button
            onClick={toggleFullscreen}
            className="md:hidden lg:hidden w-9 h-9"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? (
              <FontAwesomeIcon aria-hidden icon={faCompress} />
            ) : (
              <FontAwesomeIcon aria-hidden icon={faExpand} />
            )}
          </Button>
        )}
      </div>
    </div>
  );
};
