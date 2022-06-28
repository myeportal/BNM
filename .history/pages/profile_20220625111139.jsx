import React from 'react';
import { defaultImgs } from "../public/defaultImgs";

const profile = () => {
  return (
    <>
    <div className="pageIdentify"></div>
      <img className="profileBanner" src={defaultImgs[1]}></img>
      
    </>
  )
}

export default profile
