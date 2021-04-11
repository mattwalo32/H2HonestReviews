import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox} from "antd";



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
  </div>
  );
}

export default AddStuff;