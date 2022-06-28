import React from 'react';
import { defaultImgs } from "../public/defaultImgs";

const profile = () => {
  return (
    <>
    <div className="page">
      <img className="profileBanner" src={defaultImgs[1]}></img>
      <div className="pfpContainer">
          <img className="profilePFP" src={defaultImgs[0]}></img>
      </div>
    </div>
    </>
  )
}

export default profile
