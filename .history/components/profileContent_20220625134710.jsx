import React from 'react';
import Link from "next/link";
import { defaultImgs } from "../public/defaultImgs";
import PostInFeed from "../components/PostinFeed"; 

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
                <a className="profileEdit">Settings</a>
            </Link>
            <div className="profileBio">
            Bio Placeholder
            </div>
            <div className="profileTabs">
                <div className="profileTab">
                    Your Posts 
                </div>
            </div>
          </div> 
      </div>
      <PostInFeed profile={true}></PostInFeed>
    </>
  )
}

export default ProfileContent
