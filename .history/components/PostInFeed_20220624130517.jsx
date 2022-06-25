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

  // useEffect(() => {
  //   async function getPosts() {
  //     try {
  //       const Posts = Moralis.Object.extend("Tokens");
  //       const query = new Moralis.Query(Posts);
  //       const results = await query.find();
  //       setPostArr(results)
  //       // console.log(results)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getPosts();
  // }, []);

  // let tokenList;
  // function getData() {
  //   tokenList = postArr.map(async (token) => {
  //       let metadata = await Moralis.Cloud.run(
  //         "get_token_uri",
  //         token.attributes.uri
  //         // {url: "https://ipfs.moralis.io:2053/ipfs/Qmeh3xLUDQVNALWNhrGhJQCu62jFcZaX2Hm4ssyHZGvxde"}
  //       );
  //       return { id: token.id, metadata };
  //   }); 
  // }
  // getData();
  // console.log(tokenList)
  // const {
  //   data: queryData,
  //   error: queryError,
  //   isLoading: queryIsLoading,
  // } = useMoralisQuery("Tokens");
  // console.log(queryData)

  // useEffect(() => {
  //   function extractUri(queryData) {
  //     const fetchedContent = JSON.parse(JSON.stringify(queryData, ["uri"]));
  //     const contentUri = fetchedContent[0]["uri"];
  //     console.log(contentUri)
  //     return contentUri;
  //   }
  //   extractUri();
  // })
  // console.log(contentUri)

  // console.log(queryData)
  // async function fetchIPFSDoc() {
  //   const url = "https://ipfs.moralis.io:2053/ipfs/Qmeh3xLUDQVNALWNhrGhJQCu62jFcZaX2Hm4ssyHZGvxde";
  //   const response = await fetch(url);
  //   return await response.json();
  //   console.log(response)
  // }
  // fetchIPFSDoc()

  // useEffect(() => {
  //   setLoading(true);
  //   if(postArr) {
  //     Promise.all(
  //       postArr.map(async (nft, index) => {
  //         await Moralis.start({ serverUrl, appId, moralisSecert });
  //         const metadata = await Moralis.Web3API.token.getAllTokenIds({
  //           address: CONTRACT_ADDRESS,
  //           chain: "matic",
  //         });
  //         console.log(metadata.result)
  //         // nft.metadata = JSON.parse(metadata.result.metadata); 
  //       })
  //     ).then(() => {
  //       setPostMetadata(postArr)
  //     })
  //     setLoading(false)
  //   }
  // }, [postArr]);

  // useEffect(async () => {
  //   setLoading(true);
  //   if(postArr) {
  //     await Moralis.start({ serverUrl, appId, moralisSecert });
  //     const NFTs = await Moralis.Web3API.token.getAllTokenIds({
  //       address: CONTRACT_ADDRESS,
  //       chain: "matic",
  //     });
  //   }
  //   setLoading(false)
  // }, [postArr]);

  // console.log(postArr)


  useEffect(() => {
    const retrieveNfts = async () => {
      setLoading(true);
      await Moralis.start({ serverUrl, appId, moralisSecert });

      const nfts = await Moralis.Web3API.token.getAllTokenIds({
        address: CONTRACT_ADDRESS,
        chain: "matic",
      });
      setPostArr(nfts.result)
      
      setLoading(false)
    }
    retrieveNfts();
  }, []);

  // useEffect(() => {
  //   if(queryData) {
  //     setLoading(true);
  //     // await Moralis.start({ serverUrl, appId, moralisSecert });
  //     Promise.all(
  //       queryData.map(async (nft, index) => {
  //         const nfts = await Moralis.Web3API.token.getAllTokenIds({
  //         address: CONTRACT_ADDRESS,
  //         chain: "matic",
  //       });
  //       // console.log(nfts)
  //       nft.metadata = JSON.parse(nfts.metadata)
  //       })
  //     ).then(() => {
  //       setPostArr(queryData)
  //     });
  //     setLoading(false);
  //   }
  // }, [queryData]);
  
  // console.log(postArr);

  return (
    <>
      {postArr?.map((e) => {
        console.log(postArr)
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
                {/* <img src={defaultImgs[1]} className="postImg"></img> */}
              </div>
            </div>
          </div>
          </>
        )
        }) 
      }
      {/* <div className="feedPost">
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
      </div> */}
    </>
  )
}

export default PostInFeed