import React, { useEffect, useState } from "react";
import { useHistory, NavLink} from "react-router-dom";
import { Layout, Menu} from "antd";
import "antd/dist/antd.css";

const { Content } = Layout;

function Navigation(props) {

  return (
    <div>
      <Layout >
      <Menu mode="horizontal">
        <Menu.Item>
      <NavLink to="/">
            home
        </NavLink>
        </Menu.Item>
        <Menu.Item>
        <NavLink to="/gallery">
            gallery
        </NavLink>
        </Menu.Item>
        {/* <Menu.Item>
        <NavLink to="/manufacturers">
            manufacturers
        </NavLink>
        </Menu.Item> */}
        <Menu.Item>
        <NavLink to="/profile">
            profile
        </NavLink>
        </Menu.Item>
        <Menu.Item>
        <NavLink to="/addstuff">
            admin functionality
        </NavLink>
        </Menu.Item>
      </Menu>
        
          <Content>{props.content}</Content>
      </Layout>
    </div>
  );
}

export default Navigation;
