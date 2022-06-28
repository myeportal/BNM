const BlockNewsMediaTokenV2 = artifacts.require("BlockNewsMediaTokenV2");
const BlockNewsMediaMarketPlace = artifacts.require(
  "BlockNewsMediaMarketPlace"
);

module.exports = function (deployer) {
  deployer.deploy(BlockNewsMediaTokenV2);
  deployer.deploy(BlockNewsMediaMarketPlace);
};
