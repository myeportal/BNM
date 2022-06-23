import React from "react";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";

const feed = () => {
  return (
    <>
      <div className='page'>
          <div className='sideBar'>
              <Sidebar />
          </div>
            <div className="mainWindow">MainWindow</div>
            <div className='rightBar'>
              <Rightbar />
            </div>
        </div>  
    </>
  );
};

export default feed;