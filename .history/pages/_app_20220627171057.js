import { useState } from "react";
import { MoralisProvider, useMoralis } from "react-moralis";
import { Layout, Tabs, Menu, Breadcrumb } from "antd";
import { useRouter } from "next/router";
import "antd/dist/antd.css";
import "../styles/globals.css";
import "../components/Address/identicon.css";
import Text from "antd/lib/typography/Text";

import Account from "../components/Account/Account.jsx";
import MenuItems from "../components/MenuItems.jsx";
// import Chains from "../components/Chains/Chains.jsx";
import TokenPrice from "../components/TokenPrice.jsx";

const { Header, Content, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerDark: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#001529",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
  headerRightDark: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
    backgroundColor: "#001529",
  },
};

const LightApp = ({ component: Component, pageProps }) => {
  const { isAuthenticated } = useMoralis();
  const { pathname } = useRouter();

  const pathNameToText = (pathname) => {
    if (pathname === "/mintArticle") {
      return "Mint Article";
    } else if (pathname === "/nftAudio") {
      return "My NFAs";
    } else if (pathname === "/nftVideo") {
      return "My NFAs";
    } else if (pathname === "/nftBalance") {
      return "My NFAs";
    } else if (pathname === "/marketplace") {
      return "Marketplace";
    } else if (pathname === "/feed") {
      return "Feed";
    } else if (pathname === "/profile") {
      return "Profile";
    } else if (pathname === "/settings") {
      return "Settings";
    }
  };

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Header style={styles.header}>
        <img style={{ display: "flex" }} src={"/bnm-logo.svg"} alt="BNM Logo" />
        <MenuItems isAuthenticated={isAuthenticated} />
        <div style={styles.headerRight}>
          <TokenPrice
            address="0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270"
            image="https://polygonscan.com/images/svg/brands/polygon.svg"
            size="28px"
            exchange={"quickswap"}
            chain={"polygon"}
          />
          {/* <NativeBalance /> */}
          <Account />
        </div>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ marginTop: "100px" }}>
          <Breadcrumb.Item>Block News Media</Breadcrumb.Item>
          <Breadcrumb.Item>{pathNameToText(pathname)}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          <div style={styles.content}>
            <Component {...pageProps} />
          </div>
        </div>
      </Content>
    </Layout>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <LightApp component={Component} pageProps={pageProps} />
    </MoralisProvider>
  );
}

// This function gets called at build time
export async function getStaticProps(props) {
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {},
  };
}

export default MyApp;
