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
        "bg-secondary-light rounded-lg shadow-md overflow-hidden border border-primary/10 hover:shadow-lg transition-shadow pb-2",
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
  id?: string;
};

const Title = ({ as, id, children }: React.PropsWithChildren<TitleProps>) => {
  const As = as || "h1";
  return (
    <As id={id} className="ps-4 pe-4 pt-2 pb-2">
      {children}
    </As>
  );
};
Title.displayName = "Card.Title";

const Description = ({ children }: React.PropsWithChildren) => {
  return <p className="ps-4 pe-4">{children}</p>;
};

const Image = ({
  src,
  alt,
  children,
}: {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}) => {
  return children ? children : <img src={src} alt={alt} />;
};

const Footer = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <footer className={classNames("ps-4 pe-4", className)} {...props}>
      {children}
    </footer>
  );
};

const Content = ({ children }: React.PropsWithChildren) => {
  return <div className="ps-4 pe-4">{children}</div>;
};

Card.Title = Title;
Card.Description = Description;
Card.Image = Image;
Card.Footer = Footer;
Card.Content = Content;
