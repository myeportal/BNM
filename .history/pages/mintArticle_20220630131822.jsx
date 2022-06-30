import { useEffect, useState } from "react";
import Head from "next/head";
import {
    Card,
    Input,
    Button,
    Modal,
    Image,
    Select,
    Typography,
    notification,
} from "antd";
import {
    useMoralis,
    useMoralisFile,
    useWeb3ExecuteFunction,
} from "react-moralis";
import NftImageUploader from "../components/NftImageUploader.jsx";
import { CONTRACT_ADDRESS } from "../consts/vars";
import { BLOCK_NEWS_MEDIA_CONTRACT_ABI } from "../consts/contractAbis";
import useWindowDimensions from "../util/useWindowDimensions";
import moralis from "moralis";

const styles = {
    title: {
        fontSize: "20px",
        fontWeight: "700",
    },
    text: {
        fontSize: "16px",
    },
    card: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "0.5rem",
        width: "50%",
    },
    mobileCard: {
        boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
        border: "1px solid #e7eaf3",
        borderRadius: "0.5rem",
        width: "100%",
    },
    container: {
        padding: "0 2rem",
    },
    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
    },
    button: {
        float: "right",
        marginTop: "10px",
    },
    text: {
        fontSize: "14px",
        alignSelf: "center",
    },
    textAuthor: {
        fontSize: "14px",
        marginLeft: "10px",
        alignSelf: "center",
    },
    inputContainer: {
        display: "flex",
        flexWrap: "wrap",
    },
    childInputContainer: {
        padding: "10px",
    },
};

moralis.initialize(process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID);
moralis.serverURL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

export default function mintArticle() {
    const {
        Moralis,
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading,
    } = useMoralis();
    const user = moralis.User.current();

    const { error, saveFile } = useMoralisFile();

    const [isNftMintInProcess, setIsNftMintInProcess] = useState(false);
    const [isInputValid, setIsInputValid] = useState(false);
    const [uploadedImageFile, setUploadedImageFile] = useState(null);
    const [uploadedImageUri, setUploadedImageUri] = useState(null);
    const [descriptionText, setDescriptionText] = useState("");
    const [titleText, setTitleText] = useState("");
    // const [authorName, setAuthorName] = useState("");
    const [categoryName, setCategoryName] = useState("");

    const { width } = useWindowDimensions();
    const isMobile = width < 700;

    const {
        data,
        error: executeContractError,
        fetch: executeContractFunction,
        isFetching,
        isLoading,
    } = useWeb3ExecuteFunction();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    useEffect(() => {
        if (!isFetching && !isLoading && data) {
            setIsNftMintInProcess(false);

            Modal.success({
                title: "Congrats! Your NFT has been created!",
                content: (
                    <div>
                        <p>
                            Note: Check the "Feed" to see your post!
                        </p>
                        <Image
                            width={270}
                            src={uploadedImageUri}
                            preview={true}
                            placeholder={true}
                        />
                        <p>
                            <b>Title:</b> {titleText}
                        </p>
                        <p>
                            <b>Description:</b> {descriptionText}
                        </p>
                        <p>
                            <b>Category:</b> {categoryName}
                        </p>
                        <p>
                            {/* <b>Author:</b> {authorName} */}
                        </p>
                    </div>
                ),
                onOk() {
                    setTitleText("");
                    setDescriptionText("");
                    // setAuthorName("");
                    setCategoryName("");
                },
            });
        }
    }, [isFetching, isLoading]);

    useEffect(() => {
        if (
            descriptionText.length !== 0 &&
            titleText.length !== 0 &&
            uploadedImageFile &&
            // authorName.length !== 0 &&
            categoryName.length !== 0
        ) {
            setIsInputValid(true);
        }
    }, [descriptionText, titleText, uploadedImageFile, categoryName]); // Add "authorName" back if needed

    useEffect(() => {
        if (executeContractError && executeContractError.code === 4001) {
            setIsNftMintInProcess(false);
            notification.error({
                message: "NFT Mint Error",
                description: executeContractError.message,
            });
        }
    }, [executeContractError]);

    const uploadNftToIpfsAndMintToken = async () => {
        if(!isInputValid) {
            window.alert("Not all fields filled in! Please fill in all fields and then re-submit.")
            setIsNftMintInProcess(false);
            return
        }

        if (isAuthenticated) {
            notification.info({
                message: "Minting in progress",
                description: "Your minting is in progress",
            });

            const nftImage = await saveFile("nft.jpeg", uploadedImageFile, {
                saveIPFS: true,
            });

            if (error) {
                console.error("Error uploading NFT Image to IPFS");
            }

            const nftMetadataObj = {
                description: descriptionText,
                name: titleText,
                image: nftImage._ipfs,
                attributes: [
                    { category: categoryName },
                    // { author: authorName },
                ],
            };

            const nftMetadata = await saveFile(
                `${titleText.replace(/\s/g, "")}.json`,
                // { base64: btoa(escape(JSON.stringify(nftMetadataObj))) },
                { base64: btoa(JSON.stringify(nftMetadataObj)) },
                {
                    type: "application/json",
                    saveIPFS: true,
                }
            );

            async function saveArticle() {

                if(!descriptionText) return;
        
                const Posts = moralis.Object.extend("Posts");
        
                const newPost = new Posts();
                       
                newPost.set("postDescriptionText", descriptionText);
                newPost.set("postImg", nftImage._ipfs);
                newPost.set("postTitle", titleText);
                // newPost.set("postAuthorName", authorName);
                newPost.set("postCategory", categoryName);
                newPost.set("postPfp", user?.attributes.pfp);
                newPost.set("postAcc", user?.attributes.ethAddress);
                newPost.set("postUsername", user?.attributes.username);
        
                await newPost.save();
                // window.location.reload();
            }

            setUploadedImageUri(nftImage._ipfs);
            // console.log(nftImage._ipfs)

            executeContractFunction({
                params: {
                    abi: BLOCK_NEWS_MEDIA_CONTRACT_ABI,
                    contractAddress: CONTRACT_ADDRESS,
                    functionName: "createItem",
                    params: {
                        uriOfToken: nftMetadata._ipfs,
                    },
                    msgValue: Moralis.Units.ETH(0.01),
                },
                onSuccess: () => {
                    saveArticle();
                },
                onError: (error) => {
                console.log("ERROR")
                }
            });
        } else {
            setIsNftMintInProcess(false);
            notification.error({
                message: "You need to have your wallet connected to Mint NFTs",
                description:
                    "In order to use this feature, you have to connect your wallet to this website.",
            });
        }
    };

    return (
        <div style={styles.container}>
            <Head>
                <title>Block News Media - Mint</title>
                <meta name="description" content="Block News Media - Mint" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main style={styles.main}>
                <Card
                    style={!isMobile ? styles.card : styles.mobileCard}
                    title={"Mint your Article as NFT"}
                    loading={isNftMintInProcess}
                >
                    <Text style={styles.text}>
                        Upload the Image that will represent your NFT (max file size: 1GB)
                    </Text>
                    <NftImageUploader
                        getUploadedImageFile={(file) => setUploadedImageFile(file)}
                    />
                    <br />
                    <Text style={styles.text}>
                        Article Headline (NFT Title)
                    </Text>
                    <Input
                        placeholder="Article Headline"
                        onChange={(e) => setTitleText(e.target.value)}
                        value={titleText}
                    />
                    <br />
                    <br />
                    <Text style={styles.text}>
                        Article Text
                    </Text>
                    <TextArea
                        placeholder="Describe your article with up to 512 characters!"
                        showCount
                        maxLength={512}
                        style={{ height: 145 }}
                        onChange={(e) => setDescriptionText(e.target.value)}
                        value={descriptionText}
                        autoSize={{ minRows: 6, maxRows: 6 }}
                    />
                    <br />
                    <div style={styles.inputContainer}>
                        <div style={styles.childInputContainer}>
                            <Text style={styles.text}>Category</Text>
                            <Select
                                style={{ width: 155, marginLeft: "10px" }}
                                onChange={(e) => {
                                    setCategoryName(e);
                                }}
                            >
                                <Option value="Business">Business</Option>
                                <Option value="Technology">Technology</Option>
                                <Option value="Science">Science</Option>
                                <Option value="Politics">Politics</Option>
                                <Option value="Local Community">
                                    Local Community
                                </Option>
                                <Option value="Weather">Weather</Option>
                                <Option value="Sports">Sports</Option>
                                <Option value="Opinion">Opinion</Option>
                            </Select>
                        </div>
                        {/* <div style={styles.childInputContainer}>
                            <Text style={styles.textAuthor}>Author</Text>
                            <Input
                                style={{ width: 120, marginLeft: "10px" }}
                                placeholder="John Doe"
                                onChange={(e) => setAuthorName(e.target.value)}
                                value={authorName}
                            />
                        </div> */}
                    </div>
                    <Button
                        style={styles.button}
                        // disabled={isNftMintInProcess || !isInputValid}
                        type="primary"
                        loading={isNftMintInProcess}
                        onClick={async () => {
                            setIsNftMintInProcess(true);
                            await uploadNftToIpfsAndMintToken();
                        }}
                    >
                        Create NFT
                    </Button>
                </Card>
            </main>
        </div>
    );
}
