import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis } from "react-moralis";
import moralis from "moralis";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
moralis.initialize(appId);
moralis.serverURL = serverUrl;

const PostInFeed = () => {

  const { Moralis } = useMoralis();

  const [postArr, setPostArr] = useState([]);
  const [pfp, setPfp] = useState();
  const [username, setUsername] = useState();
  const user = moralis.User.current();

  // useEffect(() => {
  //   if(!user) return null;
  //   setPfp(user.get("pfp"))
  //   setUsername(user.get("username"))
  // }, [user]);

  useEffect(() => {
    async function getPostInfo() {
      try {
        const Posts = Moralis.Object.extend("Posts");
        const query = new Moralis.Query(Posts);
        const Accounts = Moralis.Object.extend("_User")
        // const account = user.attributes.accounts[0];
        // console.log(account)
        // if (profile) {
        //   query.equalTo("postAcc", account);
        // }
        const results = await query.find();
        // setPfp(results.replace(results.attributes.postPfp, ))
        console.log(results)
        setPostArr(results);
      } catch (error) {
        console.error(error);
      }
    }
    getPostInfo();
  }, []);

  return (
    <>
      {postArr.map((e) => {
        return(
          <>
          <div className="feedPost">
            <img src={pfp ? pfp : defaultImgs[0]} className="profilePic"></img>
            <div className="completePost">
              <div className="who">
              {username}
                <div className="accWhen">
                {
                  `${e.attributes.postAcc.slice(0, 4)}...${e.attributes.postAcc.slice(38)} · 
                  ${e.attributes.createdAt.toLocaleString('en-us', { month: 'short' })}  
                  ${e.attributes.createdAt.toLocaleString('en-us', { day: 'numeric' })}
                  `  
                }
                </div>
              </div>
              <div className="postContent">
                <div className="postTitle">
                  {e.attributes.postTitle}
                  <div className = "postCategory">
                    {e.attributes.postCategory}
                  </div>
                </div>
                {e.attributes.postDescriptionText}
                {e.attributes.postImg && (
                  <img
                    src={e.attributes.postImg}
                    className="postImg"
                  ></img>
                )}
                {e.attributes.postAudio && (
                  <audio controls>
                    <source src={e.attributes.postAudio} />
                  </audio>
                )}
                {e.attributes.postVideo && (
                  <video width="600" height="300" controls>
                    <source src={e.attributes.postVideo} />
                  </video>
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