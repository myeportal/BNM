import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
    Card,
    Image,
    Tooltip,
    Modal,
    Input,
    Alert,
    Spin,
    Button,
    notification,
} from "antd";
import {
    FileSearchOutlined,
    ShoppingCartOutlined,
    SendOutlined,
} from "@ant-design/icons";
import AddressInput from "../components/AddressInput.jsx";
import { getExplorer } from "../helpers/networks";
import { getEllipsisTxt } from "../helpers/formatters";
import {
    useWeb3ExecuteFunction,
    useNFTBalances,
    useWeb3Transfer,
} from "react-moralis";
import { CONTRACT_ADDRESS, MARKETPLACE_CONTRACT_ADDRESS } from "../consts/vars";
import {
    BLOCK_NEWS_MEDIA_CONTRACT_ABI,
    BLOCK_NEWS_MEDIA_MARKETPLACE_ABI,
} from "../consts/contractAbis";
import Head from "next/head";
import axios from "axios";

const { Meta } = Card;

const styles = {
    NFTs: {
        display: "flex",
        flexWrap: "wrap",
        WebkitBoxPack: "start",
        justifyContent: "flex-start",
        margin: "0 auto",
        maxWidth: "1000px",
        gap: "10px",
        height: "90vh",
    },
};

function NFTBalance() {
    const { getNFTBalances, data: NFTBalance } = useNFTBalances();
    const {
        Moralis,
        chainId,
        isWeb3Enabled,
        isWeb3EnableLoading,
        enableWeb3,
        authenticate,
        isAuthenticated,
    } = useMoralis();
    const [visible, setVisibility] = useState(false);
    const [nftToSend, setNftToSend] = useState(null);
    const [price, setPrice] = useState(1);
    const [loading, setLoading] = useState(false);
    const contractProcessor = useWeb3ExecuteFunction();
    const [receiverToSend, setReceiver] = useState(null);
    const [transferVisible, setTransferVisibility] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [nftData, setNftData] = useState([]);

    const listItemFunction = "addItemToMarket";
    const ItemImage = Moralis.Object.extend("ItemImages");

    const { fetch, error, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.Token(1, 18),
        receiver: receiverToSend,
        type: "erc721",
        contractAddress: CONTRACT_ADDRESS,
        token_id: nftToSend?.token_id,
    });

    useEffect(async () => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        if (NFTBalance) {
            Promise.all(
                NFTBalance.result.map(async (nft, index) => {
                    // this means moralis hasn't synced yet, do it ourselfs
                    if (nft.is_valid === 0) {
                        const metadataReq = await axios.get(nft.token_uri);

                        nft.metadata = metadataReq.data;
                    }
                })
            ).then(() => {
                setNftData(NFTBalance);
            });
        }
    }, [NFTBalance]);

    useEffect(() => {
        if (!isFetching) {
            setIsPending(false);
            setTransferVisibility(false);
        }
    }, [isFetching]);

    async function transfer(nft, amount, receiver) {
        setIsPending(true);

        await fetch();
    }

    async function list(nft, listPrice) {
        setLoading(true);

        const ops = {
            contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
            functionName: listItemFunction,
            abi: BLOCK_NEWS_MEDIA_MARKETPLACE_ABI,
            params: {
                tokenId: nft.token_id,
                tokenAddress: CONTRACT_ADDRESS,
                askingPrice: Moralis.Units.ETH(listPrice),
            },
        };

        await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                setLoading(false);
                setVisibility(false);
                succList();
            },
            onError: (error) => {
                setLoading(false);
                failList();
            },
        });
    }

    async function approveAll(nft) {
        setLoading(true);
        const ops = {
            abi: BLOCK_NEWS_MEDIA_CONTRACT_ABI,
            contractAddress: CONTRACT_ADDRESS,
            functionName: "approve",
            params: {
                to: MARKETPLACE_CONTRACT_ADDRESS,
                tokenId: nft.token_id,
            },
        };

        await contractProcessor.fetch({
            params: ops,
            onSuccess: () => {
                setLoading(false);
                setVisibility(false);
                succApprove();
            },
            onError: (error) => {
                setLoading(false);
                failApprove();
            },
        });
    }

    const handleSellClick = (nft) => {
        setNftToSend(nft);
        setVisibility(true);
    };

    function succList() {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: "Success!",
            content: `Your NFA was listed on the marketplace. It can take a few minutes until your NFT shows up on the marketplace.`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function succApprove() {
        let secondsToGo = 5;
        const modal = Modal.success({
            title: "Success!",
            content: `Approval is now set, you may list your NFA`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function failList() {
        let secondsToGo = 5;
        const modal = Modal.error({
            title: "Error!",
            content: `There was a problem listing your NFA`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    function failApprove() {
        let secondsToGo = 5;
        const modal = Modal.error({
            title: "Error!",
            content: `There was a problem with setting approval`,
        });
        setTimeout(() => {
            modal.destroy();
        }, secondsToGo * 1000);
    }

    return (
        <>
            <Head>
                <title>Block News Media - Your NFA's</title>
                <meta name="description" content="Block News Media - Mint" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Spin spinning={nftData.length === 0}>
                <div style={styles.NFTs}>
                    {false && (
                        <>
                            <Alert
                                message="Unable to fetch all NFA metadata... We are searching for a solution, please try again later!"
                                type="warning"
                            />
                            <div style={{ marginBottom: "10px" }}></div>
                        </>
                    )}
                    {nftData &&
                        nftData.result?.map((nft, index) => {
                            if (!nft.token_uri) return null;

                            return (
                                <Card
                                    hoverable
                                    actions={[
                                        <Tooltip title="View On Blockexplorer">
                                            <FileSearchOutlined
                                                onClick={() =>
                                                    window.open(
                                                        `${getExplorer(
                                                            chainId
                                                        )}address/${
                                                            nft.token_address
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
                                        <Tooltip
                                            title="Transfer NFA"
                                            key={index}
                                        >
                                            <SendOutlined
                                                onClick={() => {
                                                    setNftToSend(nft);
                                                    setTransferVisibility(true);
                                                }}
                                                style={{
                                                    fontSize: "20px",
                                                    lineHeight: "44px",
                                                    marginTop: "8px",
                                                }}
                                            />
                                        </Tooltip>,
                                        <Tooltip title="List NFA for sale">
                                            <ShoppingCartOutlined
                                                onClick={() =>
                                                    handleSellClick(nft)
                                                }
                                                style={{
                                                    fontSize: "20px",
                                                    lineHeight: "44px",
                                                    marginTop: "8px",
                                                }}
                                            />
                                        </Tooltip>,
                                    ]}
                                    style={{
                                        width: 239,
                                        border: "2px solid #e7eaf3",
                                        height: "max-content",
                                    }}
                                    cover={
                                        <Image
                                            preview={false}
                                            src={nft?.metadata.image || "error"}
                                            fallback="data:image/png;base64,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"
                                            alt=""
                                            style={{ maxWidth: "240px" }}
                                        />
                                    }
                                    key={index}
                                >
                                    <Meta
                                        title={`${nft?.metadata?.name}`}
                                        description={getEllipsisTxt(
                                            nft?.metadata?.description,
                                            10
                                        )}
                                        style={{ height: "51%" }}
                                    />
                                </Card>
                            );
                        })}
                </div>
            </Spin>

            <Modal
                title={`List ${nftToSend?.name} #${nftToSend?.token_id} For Sale`}
                visible={visible}
                onCancel={() => setVisibility(false)}
                onOk={() => list(nftToSend, price)}
                okText="List"
                footer={[
                    <Button onClick={() => setVisibility(false)}>
                        Cancel
                    </Button>,
                    <Button
                        onClick={() => approveAll(nftToSend)}
                        type="primary"
                    >
                        Approve
                    </Button>,
                    <Button
                        onClick={() => list(nftToSend, price)}
                        type="primary"
                    >
                        List
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <img
                        src={`${nftToSend?.image}`}
                        style={{
                            width: "250px",
                            margin: "auto",
                            borderRadius: "10px",
                            marginBottom: "15px",
                        }}
                    />
                    <Input
                        autoFocus
                        placeholder="Listing Price in MATIC"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Spin>
            </Modal>
            <Modal
                title={`Transfer ${nftToSend?.name || "NFA"}`}
                visible={transferVisible}
                onCancel={() => {
                    setTransferVisibility(false);
                    setIsPending(false);
                }}
                onOk={() => transfer(nftToSend, 1, receiverToSend)}
                confirmLoading={isPending}
                okText="Send"
            >
                <AddressInput
                    autoFocus
                    placeholder="Receiver"
                    onChange={setReceiver}
                />
            </Modal>
        </>
    );
}

export default NFTBalance;
