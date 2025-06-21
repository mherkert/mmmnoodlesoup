import React from "react";
import Logo from "./Logo";
import { Link } from "gatsby";
import { Search } from "./search/Search";
import { ActionBar } from "./action-bar/ActionBar";

const Header = () => {
  return (
    <header className="sticky top-0 bg-primary shadow-sm w-full z-10">
      <nav className=" w-full px-4 py-4 flex-col md:flex-row flex items-center grow gap-4">
        {/* Logo - left side */}
        <div className="flex items-center gap-4 flex-grow">
          <Link
            to="/recipes"
            className="flex items-center outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded-md"
          >
            <Logo />
          </Link>
        </div>

        {/* Search and actions right side */}
        <div className="flex items-center gap-4 flex-grow md:justify-end">
          <Search />
          <ActionBar />
        </div>
      </nav>
    </header>
  );
};

export default Header;
