import React from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { golf } from "../images/golf.png";

const PostInFeed = () => {
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
              <img src={golf} className="postImg"></img>
            </div>
          </div>
      </div>
    </>
  )
}

export default PostInFeed