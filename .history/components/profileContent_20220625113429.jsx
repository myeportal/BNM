import React from 'react';
import { defaultImgs } from "../public/defaultImgs"; 

const ProfileContent = () => {
  return (
    <>
      <div className="mainContent">
          <img className="profileBanner" src={defaultImgs[1]}></img>
      </div>
    </>
  )
}

export default ProfileContent
