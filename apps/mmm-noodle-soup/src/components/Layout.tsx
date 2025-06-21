import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import {
  FullscreenProvider,
  useFullscreenContext,
} from "../contexts/FullscreenContext";
import { FloatingActionBar } from "./action-bar/FloatingActionBar";

// Filter out Gatsby-specific props and any props with special characters
const filterGatsbyProps = (props: any) => {
  const filteredProps: any = {};

  Object.keys(props).forEach((key) => {
    // Skip Gatsby-specific props
    if (key === "pageContext" || key === "serverData" || key === "pageResources") {
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
  const filteredProps = filterGatsbyProps(props);

  return (
    <div className="h-full flex flex-col" {...filteredProps}>
      <FullscreenProvider>
        <FullscreenAware>
          <Header />
        </FullscreenAware>
        <FloatingActionBar />
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
