import React from 'react';
import { Input } from "web3uikit";

const settings = () => {
  return (
    <>
    <div className="page">
        <div className="mainWindow">
        <div className="settingsPage">
            <Input
                label="Name"
                name="NameChange"
                width="100%"
                labelBgColor="#E0E5E6"
                //   onChange={(e)=> setUsername(e.target.value)}
                />

                <Input
                label="Bio"
                name="bioChange"
                width="100%"
                labelBgColor="#E0E5E6"
                //   onChange={(e)=> setBio(e.target.value)}
                />
            </div>
        </div>
    </div>
      
    </>
  )
}

export default settings
