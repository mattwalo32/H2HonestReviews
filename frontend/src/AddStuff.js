import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, Card, Modal} from "antd";
import {Grid, GridList, GridListTile} from '@material-ui/core'
import Axios from 'axios';
import './AddStuff.css';
import ManufacturerGallery from "./ManufacturerGallery";



function AddStuff(props) {
    const [searchCity, setSearchCity] = useState("");
    const [distributors, setDistributors] = useState([]);
    const [countryRatings, setCountryRatings] = useState([]);
    const [isDistributorModalVisible, setIsDistributorModalVisible] = useState(false);
    const [distributorVal, setDistributorVal] = useState({});
    const [form] = Form.useForm();
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
          searchDistributor();
        })
      
    }
    function updateDistributor(values) { 
      Axios.put('http://localhost:5000/distributor/' + values["distributor_id"], values).then((response) => {
          console.log(response.data);
          closeDistributorModal();
          searchDistributor();
        })
      
    }

    function submitWater(values) {
      console.log(values)
      Axios.post('http://localhost:5000/waters/create', values).then((response) => {
        console.log(response.data)
      })
    }

    function submitManufacturer(values) {
      console.log(values)
      Axios.post('http://localhost:5000/manufacturers/create', values).then((response) => {
        console.log(response.data)
      })
    }

    function searchDistributor() {
        Axios.get('http://localhost:5000/distributor/' + searchCity).then((response) => {
          console.log(response.data.response)
          setDistributors(response.data.response)
        })
    }
    function searchCountry() {
        Axios.get('http://localhost:5000/countryrating').then((response) => {
          console.log(response.data.response)
          setCountryRatings(response.data.response)
        })
    }
    function deleteDistributor(id) {
        console.log(id)
        Axios.delete('http://localhost:5000/distributor/' + id).then((response) => {
            console.log(response.data);
            searchDistributor();
          })
    }

    function openDistributorUpdate(val) {
        console.log("ran open");
        console.log(val);
        setDistributorVal(val);
        setIsDistributorModalVisible(true);
    }

    function closeDistributorModal() {
        console.log("ran close");
        form.resetFields();
        setDistributorVal({});
        setIsDistributorModalVisible(false);
    }

  return (
    <div style = {{padding: 100}}>
        <div style = {{margin: 50, width: 600}}>
        <h1>Add a Distributor</h1>
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

    <h1>Add a Manufacturer</h1>
      <Form
      {...layout}
      name="basic"
      onFinish={submitManufacturer}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input the name of the manufacturer!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: 'Please input the year founded of the manufacturer!' }]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Country"
        name="country"
        rules={[{ required: true, message: 'Please input the country of the manufacturer!' }]}
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
    <Grid container spacing={3}>

            {distributors.map((val, index) => {
              return (
                <Grid item xs={3}>
                <Card  style={{ width: 300 }}>
                <p>{val["distributor_name"]}</p>
                <p>{val["distributor_city"]}</p>
                <p>{val["distributor_id"]}</p>
                <Button
                onClick = {() => (deleteDistributor(val["distributor_id"]))}
                >
                    DELETE
                </Button>
                <Button
                onClick = {() => (openDistributorUpdate(val))}
                >
                    UPDATE
                </Button>
                </Card>
                </Grid>
              );
            })}
    </Grid>
    <Modal
    title="Update Distributor" visible={isDistributorModalVisible} onOk={() => closeDistributorModal()} onCancel={() => closeDistributorModal()}
    >

    <Form
      {...layout}
      name="basic"
      form={form}
      onFinish={updateDistributor}
    >
        <div>
        {distributorVal["distributor_id"]}
        </div>
        <div>
        {distributorVal["distributor_city"]}
        </div>
        <div>
        {distributorVal["distributor_name"]}
        </div>
        <Form.Item
        label="ID"
        name="distributor_id"
        rules={[{ required: true, message: 'Please input the ID of the distributor!' }]}
      >
        <Input />
      </Form.Item>
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
      </Modal>

    <div style = {{padding: 20}}/>

    <ManufacturerGallery/>

    <h1>See All countries and average rating!</h1>

    <div style = {{padding: 20}}/>
    <Button type="primary" 
    onClick = {searchCountry}
    >
          Click here to see!
    </Button>
    <div style = {{padding: 20}}/>
    <Grid container spacing={3}>

            {countryRatings.map((val, index) => {
              return (
                <Grid item xs={3}>
                <Card  style={{ width: 300 }}>
                <p>{val["country"]}</p>
                <p>{val["avg_rating"]}</p>
                </Card>
                </Grid>
                
              );
            })}
    </Grid>

  </div>
  );
}

export default AddStuff;