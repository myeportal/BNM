import React, { useState, useEffect } from "react";
import {
    useMoralis,
    useMoralisSubscription,
    useMoralisCloudFunction,
    useMoralisQuery,
    useWeb3ExecuteFunction,
} from "react-moralis";
import {
    Card,
    Image,
    Tooltip,
    Modal,
    Input,
    Skeleton,
    Spin,
    notification,
} from "antd";
import { FileSearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Head from "next/head";
import { getExplorer } from "../helpers/networks";
import { getEllipsisTxt } from "../helpers/formatters";
import AddressInput from "../components/AddressInput.jsx";
import {
    BLOCK_NEWS_MEDIA_CONTRACT_ABI,
    BLOCK_NEWS_MEDIA_MARKETPLACE_ABI,
} from "../consts/contractAbis";
import { CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS } from "../consts/vars";
const { Meta } = Card;

const styles = {
    NFTs: {
        display: "flex",
        flexWrap: "wrap",
        WebkitBoxPack: "start",
        justifyContent: "center",
        margin: "0 auto",
        maxWidth: "1000px",
        gap: "10px",
    },
};

const MyNfts = () => {
    const {
        Moralis,
        chainId,
        web3,
        isWeb3Enabled,
        enableWeb3,
        authenticate,
        isAuthenticated,
        isWeb3EnableLoading,
        account,
    } = useMoralis();

    const [nftForSaleData, setNftForSaleData] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        data: queryData,
        error: queryError,
        isLoading: queryIsLoading,
    } = useMoralisQuery("ItemsForSale");
    // console.log(queryData)

    const contractProcessor = useWeb3ExecuteFunction();

    useEffect(async () => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        if (queryData) {
            Promise.all(
                queryData.map(async (nft, index) => {
                    const metadata =
                        await Moralis.Web3API.token.getTokenIdMetadata({
                            address: CONTRACT_ADDRESS,
                            token_id: nft.attributes.tokenId,
                            chain: "matic",
                        });
                    // console.log(metadata)
                    nft.metadata = JSON.parse(metadata.metadata);
                    // console.log(nft.metadata)
                })
            ).then(() => {
                setNftForSaleData(queryData);
            });
        }
    }, [queryData]);

    const handleSellClick = async (nft) => {
        setLoading(true);
        if (!isAuthenticated) {
            authenticate();
        } else {
            const ops = {
                abi: BLOCK_NEWS_MEDIA_MARKETPLACE_ABI,
                contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
                functionName: "buyItem",
                params: {
                    id: nft.attributes.uid,
                },
                msgValue: Moralis.Units.ETH(
                    Moralis.Units.FromWei(nft.attributes.askingPrice)
                ),
            };

            await contractProcessor.fetch({
                params: ops,
                onSuccess: () => {
                    setLoading(false);
                    succBuy();
                },
                onError: (error) => {
                    setLoading(false);
                    failBuy();
                },
            });
        }
    };

    function succBuy() {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: "Success!",
            content: `Your are now an owner of a new NFA!`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function failBuy() {
        let secondsToGo = 5;
        const modal = Modal.error({
            title: "Error!",
            content: `There was a problem buying this NFA`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    return (
        <>
            <Head>
                <title>Block News Media - Marketplace</title>
                <meta name="description" content="Block News Media - Mint" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Spin spinning={loading}>
                <div style={styles.NFTs}>
                    <Skeleton loading={nftForSaleData.length === 0}>
                        {nftForSaleData.map((nft, index) => {
                            if (!nft.metadata || nft.attributes.isSold)
                                return null;
                            console.log(nftForSaleData)
                            return (
                                <Card
                                    hoverable
                                    actions={[
                                        <Tooltip title="View On Blockexplorer" key={""}>
                                            <FileSearchOutlined
                                                onClick={() =>
                                                    window.open(
                                                        `${getExplorer(
                                                            chainId
                                                        )}address/${
                                                            nft.attributes
                                                                .token_address
                                                        }`,
                                                        "_blank"
                                                    )
                                                }
                                                style={{
                                                    fontSize: "20px",
                                                    lineHeight: "44px",
                                                    marginTop: "8px",
                                                }}
                                            />
                                        </Tooltip>,
                                        <Tooltip title={"Buy NFA"} key={""}>
                                            <ShoppingCartOutlined
                                                onClick={async () => {
                                                    await handleSellClick(nft);
                                                }}
                                                style={{
                                                    fontSize: "20px",
                                                    lineHeight: "44px",
                                                    marginTop: "8px",
                                                    color: "gray",
                                                }}
                                            />
                                        </Tooltip>,
                                    ]}
                                    style={{
                                        width: 240,
                                        border: "2px solid #e7eaf3",
                                    }}
                                    cover={
                                        <Image
                                            preview={false}
                                            src={nft.metadata?.image || "error"}
                                            fallback="data:image/png;base64,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"
                                            alt=""
                                            style={{ height: "240px" }}
                                        />
                                    }
                                    key={index}
                                >
                                    <Meta
                                        title={`${nft.metadata?.name}`}
                                        description={`Price: ${Moralis.Units.FromWei(
                                            nft.attributes.askingPrice
                                        )} MATIC`}
                                    />
                                </Card>
                            );
                        })}
                    </Skeleton>
                </div>
            </Spin>
        </>
    );
};

export default MyNfts;
