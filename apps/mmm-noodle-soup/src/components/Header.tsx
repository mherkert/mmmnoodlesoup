import React from "react";
import Logo from "./Logo";
import { Link } from "gatsby";

const Header = () => {
  const isLoggedIn = false;
  const openAddRecipeModal = () => {};
  const openLoginModal = () => {};
  return (
    <header className="sticky top-0 bg-primary shadow-sm z-10">
      <nav className="container mx-auto px-4 py-4 flex-col md:flex-row flex items-center justify-between ">
        {/* <h1 className="font-brand text-4xl font-semibold text-primary">
          Mmm Noodle Soup
        </h1> */}
        {/* Logo - left side */}
        <Link to="/recipes" className="flex items-center">
          <Logo />
        </Link>

        {/* Search - center */}
        <div className="flex-1 max-w-xl mx-4">
          {/* <SearchAutocomplete /> */}
          <input type="text" placeholder="Search" />
        </div>

        {/* Actions - right side */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={openAddRecipeModal}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Add Recipe
            </button>
          ) : (
            <button
              onClick={openLoginModal}
              className="px-4 py-2 border border-secondary-light text-secondary-light rounded-md hover:bg-primary/10"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
