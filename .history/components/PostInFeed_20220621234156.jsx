import React from 'react';
import { defaultImgs } from "../"

const PostInFeed = () => {
  return (
    <>
      <div className="feedPost">
          <img src={defaultImgs[0]} className="profilePic"></img>
      </div>
    </>
  )
}

export default PostInFeed