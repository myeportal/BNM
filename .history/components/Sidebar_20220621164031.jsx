import React from 'react';
import { Icon } from "web3uikit";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  return (
      <>
    <div className="siderContent">
        <div className="menu">
            <Link href="/feed" className="link">
                <div className="menuItems">
                    <Icon fill="#000000" size={33} svg="list" />
                    Home
                </div>
            </Link>

            <Link href="/profile" className="link">
                <div className="menuItems">
                    <Icon fill="#000000" size={33} svg="user" />
                    Profile
                </div>
            </Link>
            
            <Link href="/settings" className="link">
                <div className="menuItems">
                    <Icon fill="#000000" size={33} svg="cog" />
                    Settings
                </div>
            </Link>
        </div>
    </div>
    </>
  );
};

export default Sidebar
