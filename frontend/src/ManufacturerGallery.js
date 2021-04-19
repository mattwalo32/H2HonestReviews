import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { Form, Input} from "antd";

const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const useStylesSlider = makeStyles({
  root: {
    width: 300,
  },
});

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function ManufacturerGallery() {
  const gridClasses = useStylesGrid();
  const sliderClasses = useStylesSlider();

  const [mfgList, setMfgList] = useState([]);
  const [mfgListUpdated, setMfgListUpdated] = useState(false);
  const [showMfgByName, setShowMfgByName] = useState(null);
  const history = useHistory();

  const updateMfgList = () => {
    console.log("entered updateMfgList function")
    if (!mfgListUpdated) {
      console.log("mfgList is not updated")
      if (showMfgByName != null) {
        console.log("text present in search bar")
        Axios.get('http://localhost:5000/manufacturers/search/' + showMfgByName).then((response) => {
          if (response.data['success'] === true)
            console.log('response: ' + response.data.response)
            if (response.data.response == null) {
              setMfgList([])
            } else {
              setMfgList(response.data.response)
            }
        })
        setShowMfgByName(null);
      } else {
        console.log("text was not present in search bar")
        Axios.get(`http://localhost:5000/manufacturers`).then((response) => {
          if (response.data['success'] === true)
            setMfgList(response.data.response)
          else
            console.log("request failed")
        })
      }
      setMfgListUpdated(true);
    }
  }

  const setMfgListNeedsUpdate = () => {
    setMfgListUpdated(false);
  }

  const setShouldSearchForName = (values) => {
    setShowMfgByName(values.name);
    setMfgListUpdated();
  }

  const Manufacturer = (val) => {
    const [editing, setEditing] = useState(false)

    const submitMfg = (values) => {
      Axios.post('http://localhost:5000/manufacturers/update/' + val.val.manufacturer_id, values).then((response) => {
        console.log(response.data)
      })
      setEditing(false)
    }

    const deleteMfg = () => {
      Axios.post('http://localhost:5000/manufacturers/delete/' + val.val.water_id).then((response) => {
        console.log(response.data)
      })
    }

    const setEditingMfg = () => {
      setEditing(true);
    }

    const handleViewDetails = () => {
      history.push(`/manufacturers/${val.val.manufacturer_id}`)
    }

    const showEditForm = () => {
      if (editing) {
        return (
          <Form
            {...layout}
            name="basic"
            onFinish={submitMfg}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Edit name!' }]}
            >
              <Input />
            </Form.Item>
  
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )
      }
    }

    return (
      <Paper className={gridClasses.paper}>
        <h1>Manufacturer Name: {val.val.name} </h1>
        <Button variant="contained" onClick={handleViewDetails}> View Details</Button>
        <Button variant="contained" onClick={setEditingMfg}> Edit</Button>
        <Button variant="contained" onClick={deleteMfg}> Delete</Button>
        {showEditForm()}
      </Paper>
    )
  }

  return (
    <div className="Manufacturer Gallery">
      <h1> Manufacturers </h1>
      {updateMfgList()}
      <div className="form">
        <Button variant="contained" onClick={setMfgListNeedsUpdate}> Update</Button>
        <br></br>
        <div className={sliderClasses.root}>
          <Form
            {...layout}
            name="basic"
            onFinish={setShouldSearchForName}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Enter Name or part of name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

        </div>
        <div className={gridClasses.root}>
          <Grid container spacing={3}>
            {mfgList.map((val, index) => {
              return (
                <Grid key={index}>
                  <Manufacturer val={val} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerGallery;