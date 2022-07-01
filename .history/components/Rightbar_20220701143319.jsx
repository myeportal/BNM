import React, { useState, useEffect} from 'react'

const Rightbar = () => {

  const [news, setNews] = useState([]);
  let Parser = require("rss-parser");
  let parser = new Parser();

  (async () => {
    let feed = await parser.parseURL("https://rss.app/feeds/qMIqpYcUvQbMSesE.xml");
    // console.log(feed.title);
  
    feed.items.forEach(item => {
      // console.log(item.title + ":" + item.link);
    });
  })();
  
  const url = "https://rss.app/feeds/qMIqpYcUvQbMSesE.xml";

  useEffect(() => {
    async function getNews() {
      const text = await fetch(url).then(r => r.text());
      const xmlDoc = new DOMParser().parseFromString(text, "text/xml");
      const items = Array.from(xmlDoc.querySelectorAll("item")).map(item => ({
        title: item.querySelector("title").textContent,
        description: item.querySelector("description").childNodes[0].data
      }));
      console.log(items)
      setNews(items)
    }
    getNews();
  }, []);
  
  console.log(news)
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
