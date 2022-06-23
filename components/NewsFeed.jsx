import React from 'react';
import PostInFeed from "./PostInFeed";

const NewsFeed = () => {
  return (
    <>
      <div className="mainContent">
          <PostInFeed profile={false} />
      </div>
    </>
  )
}

export default NewsFeed
