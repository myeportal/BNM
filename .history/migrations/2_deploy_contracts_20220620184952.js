const BlockNewsMediaToken = artifacts.require("BlockNewsMediaToken");
const BlockNewsMediaMarketPlace = artifacts.require(
    "BlockNewsMediaMarketPlace"
);

module.exports = function (deployer) {
    deployer.deploy(BlockNewsMediaToken);
    deployer.deploy(BlockNewsMediaMarketPlace);
};
