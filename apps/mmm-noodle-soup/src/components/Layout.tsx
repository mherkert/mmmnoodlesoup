import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Header } from "./Header";
const Layout = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props}>
      <Nav />
      {/* <Header /> */}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
