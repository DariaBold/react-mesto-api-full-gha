import logo from "../images/logo.svg";
import React from "react";
import { Link } from "react-router-dom";

function Header({ email, loggedIn, to, direction }) {
  function onSignOut() {
    localStorage.removeItem("jwt");
    loggedIn = false;
  }
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого Россия" />
      {loggedIn ? (
        <p className="header__link">
          {email}
          <Link
            to="/sign-in"
            className="header__link-button"
            onClick={onSignOut}
          >
            {" "}
            Выйти
          </Link>
        </p>
      ) : (
        <Link to={to} className="header__link header__link-button">
          {" "}
          {direction}
        </Link>
      )}
    </header>
  );
}
export default Header;
