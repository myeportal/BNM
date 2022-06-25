import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { CONTRACT_ADDRESS } from "../consts/vars";
import { Spin } from "antd";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;

const PostInFeed = () => {

  const { Moralis } = useMoralis();

  const [postArr, setPostArr] = useState([]);
  const [postMetadata, setPostMetadata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const retrieveNfts = async () => {
      setLoading(true);
      await Moralis.start({ serverUrl, appId, moralisSecert });
      const nfts = await Moralis.Web3API.token.getAllTokenIds({
        address: CONTRACT_ADDRESS,
        chain: "matic",
      });
      const NFTs = nfts.result;
      NFTs.sort((a, b) => (a.token_id > b.token_id) ? 1 : -1)
      console.log(NFTs)
      setPostArr(NFTs)
      
      setLoading(false)
    }
    retrieveNfts();
  }, []);

  return (
    <>
      {postArr?.map((e) => {
        // console.log(postArr)
        return(
          <>
          <div className="feedPost">
            <img src={defaultImgs[0]} className="profilePic"></img>
            <div className="completeTweet">
              <div className="who">
                  Placeholder
                  <div className="accWhen">0xghdh...hdjsh - 1h</div>
              </div>
              <div className="postContent">
                {e?.metadata && JSON.parse(e?.metadata).description}
                {e?.metadata && (
                  <img
                    src={JSON.parse(e?.metadata).image}
                    className="postImg"
                  ></img>
                )}
              </div>
            </div>
          </div>
          </>
        )
        }) 
      }
    </>
  )
}

export default PostInFeed