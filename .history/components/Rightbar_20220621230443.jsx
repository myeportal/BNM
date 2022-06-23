import React from 'react'
import { Input } from 'web3uikit'

const Rightbar = () => {
  return (
      <>
        <div className="rightbarContent">
        <Input
            label="Search Posts"
            name="Search Posts"
            prefixIcon="search"
            labelBgColor="#E0E5E6"
            >
        </Input>
        <div className="trends">
            News for You!
        </div>
        </div>
    </>
  );
};

export default Rightbar
