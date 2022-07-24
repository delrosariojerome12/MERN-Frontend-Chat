import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RiSettings4Fill} from "react-icons/ri";
import {useLogoutUserMutation} from "../services/appApi";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logoutUser(user);
    navigate("/");
  };
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            style={({isActive}) =>
              isActive ? {textDecoration: "underline"} : null
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                style={({isActive}) =>
                  isActive ? {textDecoration: "underline"} : null
                }
                to={"/login"}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({isActive}) =>
                  isActive ? {textDecoration: "underline"} : null
                }
                to={"/signup"}
              >
                SignUp
              </NavLink>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <img src={user.picture} alt="" />
            </li>
            <h5>{user.name}</h5>
            <div className="dropdown">
              <button className="dropbtn">
                <RiSettings4Fill />
              </button>
              <div className="dropdown-content">
                <button onClick={handleLogout}>Log Out</button>
                <button>Log Out</button>
                <button>Log Out</button>
              </div>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
