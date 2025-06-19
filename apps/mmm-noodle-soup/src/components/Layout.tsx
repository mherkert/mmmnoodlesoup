import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import {
  FullscreenProvider,
  useFullscreenContext,
} from "../contexts/FullscreenContext";

const FullscreenAware = ({
  children,
  hideInFullscreen = true,
}: {
  children: React.ReactNode;
  hideInFullscreen?: boolean;
}) => {
  const { isFullscreen } = useFullscreenContext();

  return isFullscreen && hideInFullscreen ? null : <>{children}</>;
};
const Layout = ({
  children,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="h-full flex flex-col" {...props}>
      <FullscreenProvider>
        <FullscreenAware>
          <Header />
        </FullscreenAware>
        <Content>{children}</Content>
        <FullscreenAware>
          <Footer />
        </FullscreenAware>
      </FullscreenProvider>
    </div>
  );
};

const Content = ({ children }: { children: React.ReactNode }) => {
  return <main className="ps-4 pe-4 md:p-8 flex-1">{children}</main>;
};

export default Layout;
