import React, { useContext, useState } from "react";
import "./Navbar.scss";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Navbar = () => {
  const { user, dispatch } = useContext(Context);
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navLeft"><Link to="/" className="link">FotoFusion</Link></div>
      <div className={`navCenter ${isMenuOpen ? 'show' : ''}`}>
        <ul className="navList">
          <li className="navListItem">
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          {/* <li className="navListItem">
            <Link to="/" className="link">
              Features
            </Link>
          </li> */}
          {/* <li className="navListItem">
            <Link to="/contact" className="link">
              Contact
            </Link>
          </li>
          <li className="navListItem">
            <Link to="/write" className="link">
              Write
            </Link>
          </li> */}
          {user &&
          <li className="navListItem logoutButton" onClick={logoutHandler}>
            {user && "Logout"}
          </li>
          }
        </ul>
      </div>
      <div className="navRight">
        {user ? (
          <div className="navUser">
            <Link to="/settings" className="link">
              <img src={user.profilePic} alt="profile" />
            </Link>
            <span>Hi {user.username.split(" ")[0]}</span>
          </div>
        ) : (
          <ul className="navListAuth">
            <li>
              <Link to="/login" className="link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="link">
                Register
              </Link>
            </li>
          </ul>
        )}
      </div>
      <div
        className={`navbar-hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Navbar;
