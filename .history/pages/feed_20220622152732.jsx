import React, {useState, useEffect} from 'react';
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import NewsFeed from "../components/NewsFeed";
import { useMoralis } from "react-moralis";

const feed = () => {

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
    const metadata = await Moralis.Web3API.token.getAllTokenIds({
      address: "0xDA02e06fC55701784D7D4D504dEd7bd95D64Bb4A",
      chain: "matic",
    });
    // metadata = JSON.parse(metadata.metadata);
    console.log(metadata)
  })

  return (
    <>
      <div className='page'>
          <div className='sideBar'>
              <Sidebar />
          </div>
            <div className="mainWindow">
              <NewsFeed />
            </div>
            <div className='rightBar'>
              <Rightbar />
            </div>
        </div>  
    </>
  );
};

export default feed;