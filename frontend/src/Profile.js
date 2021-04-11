import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Descriptions, List} from "antd";


const { Content } = Layout;

function Profile(props) {

  return (
    <div>
      <Descriptions title="User Info">
    <Descriptions.Item label="Name">Angela Luo</Descriptions.Item>
    <Descriptions.Item label="Userid">1810000000</Descriptions.Item>
  </Descriptions>
  <Descriptions title="Follows">
  </Descriptions>
  <List>
      <List.Item>
        <List.Item.Meta
          title={<a >Shoshanna</a>}
        />
        <List.Item.Meta
          title={<a >Matt</a>}
        />
      </List.Item>
  </List>
  </div>
  );
}

export default Profile;