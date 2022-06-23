import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis } from "react-moralis";

const PostInFeed = () => {

  const {
    Moralis,
    chainId,
    web3,
    isWeb3Enabled,
    enableWeb3,
    authenticate,
    isAuthenticated,
    isWeb3EnableLoading,
    account,
  } = useMoralis();

  const [nftData, setNftData] = useState([]);

  useEffect(async () => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
        enableWeb3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(async() => {
    const metadata = await Moralis.Web3API.token.getNFTMetadata({
      address: "0xDA02e06fC55701784D7D4D504dEd7bd95D64Bb4A",
      chain: "matic",
    });
    // nft.metadata = JSON.parse(metadata.metadata);
    console.log(metadata)
  })

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