import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="h-full flex flex-col" {...props}>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 md:p-8 flex-1">{children}</div>;
};

export default Layout;
