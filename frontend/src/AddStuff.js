import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card} from "antd";
import Axios from 'axios';



function AddStuff(props) {
    const [searchCity, setSearchCity] = useState("");
    const [distributors, setDistributors] = useState([]);
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
      };

      function submitDistributor(values) {
        Axios.post(`http://localhost:5000/distributor/create`, values).then((response) => {
            console.log(response.data);
          })
        
      }

      function submitWater(values) {
        console.log(values)
        Axios.post('http://localhost:5000/waters/create', values).then((response) => {
          console.log(response.data)
        })
      }
    function searchDistributor() {
        Axios.get('http://localhost:5000/distributor/' + searchCity).then((response) => {
          console.log(response.data.response)
          setDistributors(response.data.response)
        })
    }
    function deleteDistributor(id) {
        console.log(id)
        Axios.delete('http://localhost:5000/distributor/' + id).then((response) => {
            console.log(response.data);
            searchDistributor();
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
        name="distributor_city"
        rules={[{ required: true, message: 'Please input the city of the distributor!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="distributor_name"
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
    <h1>Search for a Distributor!</h1>
    <input placeholder="Enter City" 
    value = {searchCity}
    onChange = {e => setSearchCity(e.target.value)}
    />
    <Button type="primary" 
    onClick = {searchDistributor}
    >
          Submit
    </Button>
    <div>

            {distributors.map((val, index) => {
              return (
                <Card  style={{ width: 300 }}>
                <p>{val["distributor_name"]}</p>
                <p>{val["distributor_city"]}</p>
                <p>Card content</p>
                <Button
                onClick = {() => (deleteDistributor(val["distributor_id"]))}
                >
                    DELETE
                </Button>
                </Card>
              );
            })}
    </div>

  </div>
  );
}

export default AddStuff;