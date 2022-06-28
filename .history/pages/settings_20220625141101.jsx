import React from 'react';
import { Input } from "web3uikit";
import pfp1 from "../images/pfp1.png";
import pfp2 from "../images/pfp2.png";
import pfp3 from "../images/pfp3.png";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const settings = () => {

    const pfps = [pfp1,pfp2,pfp3,pfp4,pfp5];
    console.log(pfps)
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

                <div className="pfp">
                    Profile Image (Your NFTs)

                    <div className="pfpOptions">
                        {pfps.map((e,i) => {
                            return(
                                <>
                                <img
                                src={e}
                                className="pfpOption"
                                ></img>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
      
    </>
  )
}

export default settings
