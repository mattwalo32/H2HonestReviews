import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Image} from "antd";
import logo from "./logo.png"


const { Content } = Layout;

function Home(props) {

  return (
    <div>
      <Image
      width={700}
      src = {logo}
    />
    <a href='/Calendar.ics' download>Get water reminders</a>
    </div>
  );
}

export default Home;