import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu, Descriptions, List} from "antd";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
const { Content } = Layout;

const BASE_URL = "http://localhost:5000"

function Profile({userData}) {

  const [usernameSearch, setUsernameSearch] = useState("");
  const [users, setUsers] = useState([]);

  const generateUsers = () => {
    return users.map((user) => {
      return <p>{user.username}</p>
    })
  }

  const getUsers = async () => {
    const res = await axios.get(`${BASE_URL}/users/${usernameSearch}`)
    setUsers(res.data.response)
  }

  return (
    <div>
      <Descriptions title="User Info">
    <Descriptions.Item label="Name">{userData.username}</Descriptions.Item>
    <Descriptions.Item label="Userid">{userData.user_id}</Descriptions.Item>
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

  <h2>Find Other Users</h2>
  <TextField value={usernameSearch} onChange={(e) => setUsernameSearch(e.target.value)} />
  <Button onClick={getUsers}>Search</Button>
    {generateUsers()}
  </div>
  );
}

export default Profile;