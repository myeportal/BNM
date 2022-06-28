import React from 'react';
import Link from "next/link";
import { defaultImgs } from "../public/defaultImgs"; 

const ProfileContent = () => {
  return (
    <>
      <div className="mainContent">
          <img className="profileBanner" src={defaultImgs[1]}></img>
          <div className="pfpContainer">
            <img className="profilePFP" src={defaultImgs[0]}></img>
            <div className="profileName">Name Placeholder</div>
            <div className="profileWallet">0xgh...bhjd</div>
            <Link href="/settings">
                <a className="profileEdit">Edit Profile</a>
            </Link>
          </div> 
          <div className="profileBio">
            Bio Placeholder
          </div>
      </div>
    </>
  )
}

export default ProfileContent
