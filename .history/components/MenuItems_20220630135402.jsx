import { Button, Dropdown, Menu, Space } from "antd";
import { DoubleLeftOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";
import Link from "next/link";

function MenuItems({ isDark, isAuthenticated }) {
  const { pathname } = useRouter();

  const menuItems = [
    {
      key: "/MintArticle",
      label: (
        <Link href="/MintArticle">
          <a>Article</a>
        </Link>
      )
    },
    {
      key: "/MintAudio",
      label: (
        <Link href="/MintAudio">
          <a>Audio</a>
        </Link>
      )
    },
    {
      key: "MintVideo",
      label: (
        <Link href="/MintVideo">
          <a>Video</a>
        </Link>
      )
    }
  ]

  const menu = (
    <Menu>
      {menuItems.map((item) => (
        <Menu.Item key={item.key}>
          <span>{item.label}</span>
        </Menu.Item>
      ))}
    </Menu>
  )

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
      <Menu.Item>
        <Dropdown overlay={menu} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
              <Space>
                ⛓ Mint
                <DownOutlined />
              </Space>
          </a>
        </Dropdown>
      </Menu.Item>
      {/* {isAuthenticated && (
        <Menu.Item key="/nftBalance">
          <Link href="/nftBalance">
            <a>🖼 Your NFAs</a>
          </Link>
        </Menu.Item>
      )} */}
      <Menu.Item key="/Feed">
        <a href="/Feed">
          <a>📰 Feed</a>
        </a>
      </Menu.Item>
      <Menu.Item key="/Marketplace">
        <a href="/Marketplace">
          <a>🛍 Marketplace</a>
        </a>
      </Menu.Item>
      <Menu.Item key="/Profile">
        <a href="/Profile">
          <a>😀 Profile</a>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
