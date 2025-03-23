import * as React from "react";
import { navigate, type PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  navigate("/recipes");
  return null;
};

export default IndexPage;
