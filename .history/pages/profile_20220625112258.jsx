import React from 'react';
import ProfileContent from "../components/profileContent"
import { defaultImgs } from "../public/defaultImgs";

const profile = () => {
  return (
    <>
    <div className="page">
        <div className="mainWindow">
            <ProfileContent />
        </div>
    </div>
    </>
  )
}

export default profile
