import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis } from "react-moralis";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;

const PostInFeed = () => {

  const {
    Moralis
  } = useMoralis();

  const retrieveNfts = async () => {
    await Moralis.start({ serverUrl, appId, moralisSecert });

    const nfts = await Moralis.Web3API.token.getAllTokenIds({
      address: "0xDA02e06fC55701784D7D4D504dEd7bd95D64Bb4A",
      chain: "matic",
    });
    console.log(nfts)
  };

  retrieveNfts();

  return (
    <>
      <div className="feedPost">
          <img src={defaultImgs[0]} className="profilePic"></img>
          <div className="completeTweet">
            <div className="who">
                Placeholder
                <div className="accWhen">0xghdh...hdjsh - 1h</div>
            </div>
            <div className="postContent">
              Placeholder text
              <img src={defaultImgs[1]} className="postImg"></img>
            </div>
          </div>
      </div>
    </>
  )
}

export default PostInFeed