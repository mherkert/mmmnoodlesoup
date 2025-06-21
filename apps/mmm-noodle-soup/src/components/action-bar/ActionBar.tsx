import React from "react";
import { Button } from "../buttons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

export const ActionBar = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  /**TODO: handle loading and error */
  /**TODO: handle layout shift when reloading page */
  if (isLoading) {
    return <div>Loading...</div>;
    // return null;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div
      className="flex gap-4 items-center"
    >
      {isAuthenticated && user ? (
        <>
          <Link
            className="text-white rounded-md px-4 py-2 bg-primary hover:bg-primary-dark outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white border border-solid border-white hidden lg:block text-nowrap"
            to="/recipes/create"
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            <span className="text-nowrap">Add Recipe</span>
          </Link>
          <Menu>
            <MenuButton className="outline-none focus:outline-2 focus:outline-offset-2 focus:outline-white rounded-full active:bg-primary-light ">
              <img
                aria-label="User profile"
                src={user.picture}
                alt={user.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="z-20 mt-5 bg-primary p-2 rounded-md shadow-lg border border-solid border-white"
            >
              <MenuItem>
                <div className="flex flex-col items-center justify-center p-2 bg-primary-light rounded-md mb-2">
                  <img
                    aria-label="User profile"
                    src={user.picture}
                    alt={user.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <span className="text-nowrap text-white text-sm">
                    {user.name}
                  </span>
                  <span className="text-nowrap text-white text-xs">
                    {user.email}
                  </span>
                </div>
              </MenuItem>
              <MenuItem>
                <Button
                  variant="ghost"
                  size="sm"
                  inverse
                  className="hover:bg-primary-light"
                  onClick={() => logout()}
                >
                  <FontAwesomeIcon className="mr-2" icon={faSignOut} />
                  <span className="text-nowrap">Log out</span>
                </Button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </>
      ) : (
        <Button onClick={() => loginWithRedirect()} variant="outline" inverse>
          Sign In
        </Button>
      )}
    </div>
  );
};
