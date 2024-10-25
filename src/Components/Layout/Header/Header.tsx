import {
  DarkThemeToggle,
  Navbar,
  TextInput,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TRootState } from "../../../Store/BigPie";
import { userActions } from "../../../Store/UserSlice";
import { CiSearch } from "react-icons/ci";
import { searchActions } from "../../../Store/SearchSlice";
import { useState } from "react";

const Header = () => {
  const user = useSelector((state: TRootState) => state.UserSlice.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logout = () => {
    dispatch(userActions.logout());
    nav("/");
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(searchActions.searchWord(value));
  };


  return (
    <Navbar
      fluid
      rounded
      className="transition-all duration-300 bg-blue-600 dark:bg-black"
    >
      <Navbar.Brand as={Link} to="/">
        <span className="self-center text-xl font-extrabold text-black whitespace-nowrap dark:text-green-300">
          B-Cards
        </span>
      </Navbar.Brand>

      <Navbar.Toggle />

      <Navbar.Collapse>
        <Navbar.Link
          as={Link}
          to="/"
          className="text-black "
        >
          Home
        </Navbar.Link>

        <Navbar.Link
          as={Link}
          to="/about"
          className="text-black "
        >
          About
        </Navbar.Link>

        {!user && (
          <>
            <Navbar.Link
              as={Link}
              to="/signin"
              className="text-black "
            >
              Sign In
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/signup"
              className="text-black "
            >
              Sign Up
            </Navbar.Link>
          </>
        )}
        {user && (
          <>
            <Navbar.Link
              as={Link}
              to="/profile"
              className="text-black "
            >
              Profile
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/favorites"
              className="text-black "
            >
              Favorites
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/createcard"
              className="text-black "
            >
              Create Card
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              to="/mycards"
              className="text-black "
            >
              My Cards
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              className="text-black "
              onClick={logout}
            >
              Log out
            </Navbar.Link>
          </>

        )}
      </Navbar.Collapse>

      <TextInput rightIcon={CiSearch} onChange={search} />



      <DarkThemeToggle className="gap-3 max-md:flex max-md:flex-col max-md:items-center" />
    </Navbar>
  );
};

export default Header;
