import React from 'react';
import { Icon } from "web3uikit";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
      <>
    <div className="siderContent">
        <div className="menu">
            <Router>
                <Link to="/" className="link">
                    <div className="menuItems">
                        <Icon fill="#000000" size={33} svg="list" />
                        Home
                    </div>
                </Link>

                <Link to="/" className="link">
                    <div className="menuItems">
                        <Icon fill="#000000" size={33} svg="user" />
                        Profile
                    </div>
                </Link>
                
                <Link to="/" className="link">
                    <div className="menuItems">
                        <Icon fill="#000000" size={33} svg="cog" />
                        Settings
                    </div>
                </Link>
            </Router>
        </div>
    </div>
    </>
  );
};

export default Sidebar
