import React from 'react';
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
          </div> 
      </div>
    </>
  )
}

export default ProfileContent
