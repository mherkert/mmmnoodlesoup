import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Header } from "./Header";

const Layout = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  
  const ContentStyle = ({ children }: { children: React.ReactNode }) => {
    return <div className="p-8">{children}</div>;
  };

  return (
    <div {...props}>
      <Nav />
      <ContentStyle>{children}</ContentStyle>
      <Footer />
    </div>
  );
};

export default Layout;
