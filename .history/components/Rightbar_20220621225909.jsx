import React from 'react'
import { Input } from 'web3uikit'

const Rightbar = () => {
  return (
    <div className="rightbarContent">
      <Input
        label="Search Posts"
        name="Search Posts"
        prefixIcon="search"
        labelBgColor="#141d26"
        >
    </Input>
    </div>
  )
}

export default Rightbar
