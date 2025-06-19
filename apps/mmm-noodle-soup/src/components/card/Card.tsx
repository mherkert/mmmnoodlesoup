import React from "react";
import classNames from "classnames";

// TODO: refactor, as this also exists in Layout: Filter out Gatsby-specific props and any props with special characters
const filterGatsbyProps = (props: any) => {
  const filteredProps: any = {};

  Object.keys(props).forEach((key) => {
    // Skip Gatsby-specific props
    if (
      key === "pageContext" ||
      key === "serverData" ||
      key === "pageResources"
    ) {
      return;
    }

    // Skip props that might contain special characters or be invalid DOM attributes
    if (key.includes("*") || key.includes("$") || key.startsWith("_")) {
      return;
    }

    filteredProps[key] = props[key];
  });

  return filteredProps;
};

export const Card = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const filteredProps = filterGatsbyProps(props);

  return (
    <article
      className={classNames(
        "bg-secondary-light rounded-lg shadow-md overflow-hidden border border-primary/10 hover:shadow-lg transition-shadow pb-2",
        className
      )}
      {...filteredProps}
    >
      {children}
    </article>
  );
};

type TitleProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  className?: string;
};

const Title = ({
  as,
  id,
  children,
  className,
}: React.PropsWithChildren<TitleProps>) => {
  const As = as || "h1";
  return (
    <As id={id} className={classNames("ps-4 pe-4 pt-2 pb-2", className)}>
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
  className,
}: {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  // return children ? children : <img src={src} alt={alt} />;
  return <div className={classNames(className)}>{children}</div>;
};

const Footer = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const filteredProps = filterGatsbyProps(props);

  return (
    <footer className={classNames("ps-4 pe-4", className)} {...filteredProps}>
      {children}
    </footer>
  );
};

const Content = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const filteredProps = filterGatsbyProps(props);

  return (
    <div className={classNames("ps-4 pe-4", className)} {...filteredProps}>
      {children}
    </div>
  );
};

const Header = ({
  children,
  className,
  ...props
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  const filteredProps = filterGatsbyProps(props);

  return (
    <div className={classNames(className)} {...filteredProps}>
      {children}
    </div>
  );
};

const Separator = ({
  className,
}: React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) => {
  return (
    <hr
      className={classNames(
        "block full-width border-y-1 border-solid border-gray-300 ms-6 me-6 my-4",
        className
      )}
    />
  );
};

Card.Title = Title;
Card.Description = Description;
Card.Image = Image;
Card.Header = Header;
Card.Footer = Footer;
Card.Content = Content;
Card.Separator = Separator;
