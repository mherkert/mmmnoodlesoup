import React from "react";
import Layout from "./src/components/Layout";
import "./src/styles/global.css";

export const wrapPageElement = ({
  element,
  props,
}: {
  element: React.ReactNode;
  props: React.HTMLAttributes<HTMLDivElement>;
}) => {
  return <Layout {...props}>{element}</Layout>;
};
