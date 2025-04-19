import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  const Content = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-8">{children}</div>;
  };

  return (
    <div {...props}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default Layout;
