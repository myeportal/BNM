import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisFile } from "react-moralis";


export default function Home() {
    /* import moralis */
    const Moralis = require("moralis/node");

    /* Moralis init code */
    const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
    const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
    const masterKey = process.env.NEXT_PUBLIC_MORALIS_MASTER_KEY;

    await Moralis.start({ serverUrl, appId, masterKey });

    const {
        isWeb3Enabled,
        enableWeb3,
        isAuthenticated,
        isWeb3EnableLoading,
    } = useMoralis();

    useEffect(() => {
        if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
            enableWeb3();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isWeb3Enabled]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Block News Media - Home</title>
                <meta name="description" content="Block News Media - Home" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Block News Media</h1>
            </main>
        </div>
    );
}
