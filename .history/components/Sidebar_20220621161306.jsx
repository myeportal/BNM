import React from 'react';
import { Icon } from "web3uikit";

const Sidebar = () => {
  return (
      <>
    <div className="siderContent">
        <div className="menu">
            <div className="menuItems">
                <Icon fill="#000000" size={33} svg="list" />
            </div>
            <div className="menuItems">
                <Icon fill="#000000" size={33} svg="user" />
            </div>
            <div className="menuItems">
                <Icon fill="#000000" size={33} svg="cog" />
            </div>
        </div>
    </div>
    </>
  );
};

export default Sidebar
