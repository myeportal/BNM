import React from 'react'

const Rightbar = () => {
  let Parser = require("rss-parser");
  let parser = new Parser();

  (async () => {
    let feed = await parser.parseURL("https://rss.app/feeds/qMIqpYcUvQbMSesE.xml");
    console.log(feed.title);
  
    feed.items.forEach(item => {
      console.log(item.title + ":" + item.link);
    });
  })();
  
  const url = "https://rss.app/feeds/qMIqpYcUvQbMSesE.xml";

  return (
      <>
        <div className="rightbarContent">
        <div className="trends">
            Add the Bitcoin news feed from blocknewsmedia.com
        </div>
        </div>
    </>
  );
};

export default Rightbar
