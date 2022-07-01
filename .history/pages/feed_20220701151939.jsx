import React from "react";
import Rightbar from "../components/Rightbar";
import PostInFeed from "../components/PostInFeed";

const Feed = () => {
  
  return (
    <>
      <div className='page'>
            <div className="mainWindow">
              <div className="postContent">
                <PostInFeed />
              </div>
            </div>
            <div className='rightBar'>
              <Rightbar />
            </div>
        </div>  
    </>
  );
};

export default Feed;