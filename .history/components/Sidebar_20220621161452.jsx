import React from 'react';
import { Icon } from "web3uikit";

const Sidebar = () => {
  return (
      <>
    <div className="siderContent">
        <div className="menu">
            <div className="menuItems">
                <Icon fill="#000000" size={33} svg="list" />
                Home
            </div>
            <div className="menuItems">
                <Icon fill="#000000" size={33} svg="user" />
                Profile
            </div>
            <div className="menuItems" text="black">
                <Icon fill="#000000" size={33} svg="cog" />
                Settings
            </div>
        </div>
    </div>
    </>
  );
};

export default Sidebar
