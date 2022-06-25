import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";

function MenuItems({ isDark, isAuthenticated }) {
  const { pathname } = useRouter();

  return (
    <Menu
      theme={isDark ? "dark" : "light"}
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "left",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/mint">
        <Link href="/mint">
          <a>⛓️ Mint NFAs</a>
        </Link>
      </Menu.Item>
      {isAuthenticated && (
        <Menu.Item key="/nftBalance">
          <Link href="/nftBalance">
            <a>🖼 Your NFAs</a>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item key="/marketplace">
        <a href="/marketplace">
          <a>🛍 Marketplace</a>
        </a>
      </Menu.Item>
      <Menu.Item key="/feed">
        <a href="/feed">
          <a>📰 Feed</a>
        </a>
      </Menu.Item>
      <Menu.Item key="/feed">
        <a href="/feed">
          <a>😀 Profile</a>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
