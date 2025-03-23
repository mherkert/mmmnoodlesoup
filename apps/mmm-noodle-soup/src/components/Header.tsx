import React from "react";

export const Header = () => {
  return (
    <header className="bg-secondary-light border-b border-primary/10">
      <div className="container mx-auto px-4 py-4">
        <h1 className="font-brand text-4xl font-semibold text-primary">
          Mmm Noodle Soup
        </h1>
        <nav className="mt-4">
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="text-primary hover:text-primary-accent transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/recipes"
                className="text-primary hover:text-primary-accent transition-colors"
              >
                Recipes
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-primary hover:text-primary-accent transition-colors"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
