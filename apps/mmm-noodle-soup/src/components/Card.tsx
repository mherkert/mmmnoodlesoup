import React from "react";
import classNames from "classnames";
export const Card = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <article
      className={classNames(
        "bg-secondary-light rounded-lg shadow-md overflow-hidden border border-primary/10 hover:shadow-lg transition-shadow",
        className
      )}
      {...props}
    >
      {children}
    </article>
  );
};

type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Title = ({ as, children }: React.PropsWithChildren<TitleProps>) => {
  const As = as || "h1";
  return <As className="ps-4 pe-4">{children}</As>;
};

const Description = ({ children }: React.PropsWithChildren) => {
  return <p className="ps-4 pe4">{children}</p>;
};

const Image = ({ src, alt }: { src: string; alt: string }) => {
  return <img className="float-start" src={src} alt={alt} />;
};

const Footer = ({ children }: React.PropsWithChildren) => {
  return <footer className="ps-4 pe-4">{children}</footer>;
};

Card.Title = Title;
Card.Description = Description;
Card.Image = Image;
Card.Footer = Footer;
