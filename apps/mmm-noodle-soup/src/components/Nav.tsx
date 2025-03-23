import { Link } from "gatsby";
import React from "react";
import Logo from "./Logo";

const Nav = () => {
  return (
    <nav className="bg-primary pb-4">
      <ul className="m-0 p-0 grid gap-4 grid-cols-[2fr_4fr_1fr] list-none">
        <li className="self-center">
          <Link to="/">
            <Logo />
          </Link>
        </li>
        <li className="self-end">
          <input type="text" placeholder="Search" />
        </li>
        <li className="self-end">
          <Link to="/recipes/create">Add a Recipe</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
