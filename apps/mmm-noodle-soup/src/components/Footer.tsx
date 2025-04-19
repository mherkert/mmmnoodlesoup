import React from "react";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 bg-primary font-brand text-secondary-light text-center text-sm">
      © Mmm NoodleSoup {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;