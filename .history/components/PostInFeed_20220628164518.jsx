import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { CONTRACT_ADDRESS } from "../consts/vars";
import { Spin } from "antd";
import { useVerifyMetadata } from "../hooks/useVerifyMetadata";
import moralis from "moralis";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;
moralis.initialize(appId);
moralis.serverURL = serverUrl;

const PostInFeed = ({profile}) => {

  const { Moralis, account } = useMoralis();
  const user = moralis.User.current();
  // console.log(account)

  const [postArr, setPostArr] = useState([]);
  // const [postInfo, setPostInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  // useEffect(() => {
  //   const retrieveNfts = async () => {
  //     setLoading(true);
  //     await Moralis.start({ serverUrl, appId, moralisSecert });
  //     const nfts = await Moralis.Web3API.token.getAllTokenIds({
  //       address: CONTRACT_ADDRESS,
  //       chain: "mumbai",
  //     });
  //     const NFTs = nfts.result;
  //     NFTs.sort((a, b) => (a.block_number_minted > b.block_number_minted) ? 1 : -1)
  //     setPostArr(NFTs)
      
  //     setLoading(false)
  //   }
  //   retrieveNfts();
  // }, []);

  useEffect(() => {
    async function getPostInfo() {
      try {
        const Posts = Moralis.Object.extend("PostV3");
        const query = new Moralis.Query(Posts)
        if (profile) {
          query.equalTo("postAcc", account);
        }
        const results = await query.find();
        console.log(results)
        setPostArr(results);
      } catch (error) {
        console.error(error);
      }
    }
    getPostInfo();
  }, [profile]);

  return (
    <>
      {postArr.map((e) => {
        return(
          <>
          <div className="feedPost">
            <img src={defaultImgs[0]} className="profilePic"></img>
            <div className="completeTweet">
              <div className="who">
                Placeholder
                  {/* {post?.attributes.postAcc.slice(0,6)} */}
                  <div className="accWhen">0xghdh...hdjsh - 1h</div>
              </div>
              <div className="postContent">
                {e.attributes.postDescription}
                {e.attributes.postImg && (
                  <img
                    src={e.attributes.postImg}
                    className="postImg"
                  ></img>
                )}
              </div>
            </div>
          </div>
          </>
        )
      }).reverse() 
      }
    </>
  )
}

export default PostInFeed