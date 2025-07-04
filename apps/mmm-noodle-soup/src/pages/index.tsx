import * as React from "react";
import { useEffect } from "react";
import { navigate, type PageProps } from "gatsby";

const IndexPage: React.FC<PageProps> = () => {
  // redirect to recipe page
  useEffect(() => {
    navigate("/recipes");
  }, []);

  return null;
};

export default IndexPage;
