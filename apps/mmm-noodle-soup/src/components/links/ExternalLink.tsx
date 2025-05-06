import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  showIcon?: boolean;
};

export const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className = "",
  showIcon = true,
}) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className={`hover:text-primary-dark inline-flex items-center underline text-primary gap-1  ${className}`}
      aria-label={`${children} (opens in new tab)`}
    >
      {children}
      {showIcon && (
        <FontAwesomeIcon
          icon={faUpRightFromSquare}
          aria-hidden
          className="text-xs"
        />
      )}
    </a>
  );
};
