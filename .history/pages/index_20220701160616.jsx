import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis } from "react-moralis";


export default function Home() {
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
