import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox} from "antd";
import Axios from 'axios';



function AddStuff(props) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

      function submitDistributor(values) {
        console.log('Success:', values);
      }

      function submitWater(values) {
        console.log(values)
        Axios.post('http://localhost:5000/waters/create', values).then((response) => {
          console.log(response.data)
        })
      }

  return (
    <div>
        <h1>Add a distributor</h1>
      <Form
      {...layout}
      name="basic"
      onFinish={submitDistributor}
    >
      <Form.Item
        label="City"
        name="city"
        rules={[{ required: true, message: 'Please input the city of the distributor!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the name of the distributor!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>

    <h1>Add a Water</h1>
      <Form
      {...layout}
      name="basic"
      onFinish={submitWater}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the name of the water!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Manufacturer Id"
        name="manufacturer_id"
        rules={[{ required: true, message: 'Please input the id of the manufacturer!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>
  );
}

export default AddStuff;