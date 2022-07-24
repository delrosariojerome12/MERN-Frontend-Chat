import React from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
const Home = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="home">
      <div className="landing">
        <div className="text">
          <h1>Let's Talk!</h1>
          <p>Have small chat with your friends!</p>
          {user ? (
            <>
              <Link to={"/chat"}>
                <button>Get Started</button>
              </Link>
            </>
          ) : (
            <Link to={"/signup"}>
              <button>Create And Talk</button>
            </Link>
          )}
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default Home;
