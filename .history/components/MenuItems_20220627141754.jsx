import { Dropdown, Menu, Space } from "antd";
import { DoubleLeftOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from "next/router";

function MenuItems({ isDark, isAuthenticated }) {
  const { pathname } = useRouter();

  const menu = [
    {
      key: "/mintArticle",
      label: (
        <a href="/mintArticle">
          Article file
        </a>
      )
    },
    {
      key: "/mintAudio",
      label: (
        <a href="/mintAudio">
          Audio file
        </a>
      )
    },
    {
      key: "mintVideo",
      label: (
        <a href="/mintArticle">
          Video file
        </a>
      )
    }
  ]

  // const menu = (
  //   <Menu>
  //     {menuItems.map((item) => (
  //       <Menu.item key={item.key}>
  //         <span>{item.label}</span>
  //       </Menu.item>
  //     ))}
  //   </Menu>
  // )

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
