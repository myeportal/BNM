import { Dropdown, Menu, Space } from "antd";
import { DoubleLeftOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

function MenuItems({ isDark, isAuthenticated }) {
  const { pathname } = useRouter();

  const menuItems = [
    {
      key: "1",
      label: (
        <a href="/mintArticle">
          Article file
        </a>
      )
    },
    {
      key: "2",
      label: (
        <a href="/mintAudio">
          Audio file
        </a>
      )
    },
    {
      key: "1",
      label: (
        <a href="/mintArticle">
          Video file
        </a>
      )
    },
  ]

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
        <Dropdown overlay={menuItems}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              ⛓ NFTs
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
      <Menu.Item key="/feed">
        <a href="/feed">
          <a>📰 Feed</a>
        </a>
      </Menu.Item>
      <Menu.Item key="/marketplace">
        <a href="/marketplace">
          <a>🛍 Marketplace</a>
        </a>
      </Menu.Item>
      <Menu.Item key="/profile">
        <a href="/profile">
          <a>😀 Profile</a>
        </a>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
