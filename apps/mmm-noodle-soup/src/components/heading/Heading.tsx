import React from "react";
export const Heading = ({
  children,
  level = 1,
}: {
  children: React.ReactNode;
  level?: number;
}) => {
  switch (level) {
    case 1:
      return <h1 className="pt-8 pb-6">{children}</h1>;
    case 2:
      return <h2 className="pt-6 pb-4">{children}</h2>;
    case 3:
      return <h3 className="pt-4 pb-2">{children}</h3>;
    default:
      return <h1 className="pt-8 pb-6">{children}</h1>;
  }
};
