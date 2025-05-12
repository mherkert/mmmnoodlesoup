import React from "react";
import Logo from "./Logo";
import { Link } from "gatsby";
import Search from "./search/Search";
import { Button } from "@headlessui/react";

const Header = () => {
  const isLoggedIn = false;
  const openAddRecipeModal = () => {};
  const openLoginModal = () => {};
  return (
    <header className="sticky top-0 bg-primary shadow-sm z-10">
      <nav className="container mx-auto px-4 py-4 flex-col md:flex-row flex items-center justify-between gap-4">
        {/* Logo - left side */}
        <Link
          to="/recipes"
          className="flex items-center outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white focus:rounded-md"
        >
          <Logo />
        </Link>

        {/* Search - center */}
        <Search />

        {/* Actions - right side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Button
              onClick={openAddRecipeModal}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white"
            >
              Add Recipe
            </Button>
          ) : (
            <Button
              onClick={openLoginModal}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white border border-solid border-white"
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
