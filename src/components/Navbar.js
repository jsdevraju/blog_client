import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/userSlice";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  //All State Varibale
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const menuLi = document.querySelectorAll(".nav_menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));
  }, []);

  //When User Click Logout button
  const logout = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_PROXY}/logout`);
      dispatch(login(data));
      localStorage.clear();
      setLoading(false);
      toast.success("Logout in successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading && !token) return <Loader />;

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar">
            {/* Logo */}
            <Link to="/">Razu Islam</Link>
            {/* Nav Item */}
            <div className="nav_menu">
              <ul className={showMenu ? "active" : "nav_item"}>
                {token ? (
                  <>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/create-blog">Create Blog</Link>
                    </li>
                    <li>
                      <Link to="/user-profile">Profile</Link>
                    </li>
                    <button className="app_btn btn_trans" onClick={logout}>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </>
                )}
              </ul>
              <div
                className="mobile_menu"
                onClick={() => setShowMenu(!showMenu)}
              >
                <FaBars size={40} />
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
