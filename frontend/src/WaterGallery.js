import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import { Form, Input, Checkbox} from "antd";

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


function WaterGallery() {
  const gridClasses = useStylesGrid();
  const sliderClasses = useStylesSlider();

  const [waterList, setWaterList] = useState([]);
  const [waterListUpdated, setWaterListUpdated] = useState(false);

  const [showFolloweeFavs, setShowFolloweeFavs] = useState(false);
  const [showAllWaters, setShowAllWaters] = useState(true);
  const [showWatersByName, setShowWatersByName] = useState(null);
  const [sliderValue, setSliderValue] = React.useState(0);
  const history = useHistory();

  const updateWaterList = () => {
    if (!waterListUpdated) {
      if (showWatersByName != null) {
        Axios.get('http://localhost:5000/waters/name/' + showWatersByName).then((response) => {
          if (response.data['success'] == true)
            console.log('response: ' + response.data.response)
            if (response.data.response == null) {
              setWaterList([])
            } else {
              setWaterList(response.data.response)
            }
        })
        setShowWatersByName(null)
      } else if (showFolloweeFavs) {
        Axios.get('http://localhost:5000/following/favorites/7').then((response) => {
          if (response.data['success'] == true)
            console.log(response.data.response)
            if (response.data.response == null) {
              setWaterList([])
            } else {
              setWaterList(response.data.response)
            }
        })
        setShowFolloweeFavs(false)
      } else if (showAllWaters) {
        Axios.get('http://localhost:5000/waters').then((response) => {
          if (response.data['success'] == true)
            console.log(response.data.response)
            if (response.data.response == null) {
              setWaterList([])
            } else {
              setWaterList(response.data.response)
            }
        })
        setShowAllWaters(false)
      } else {
        Axios.get(`http://localhost:5000/water/byminrating/${sliderValue}`).then((response) => {
          if (response.data['success'] == true)
            setWaterList(response.data.response)
        })
      }
      setWaterListUpdated(true);
    }
  }

  const setWaterListNeedsUpdate = () => {
    setWaterListUpdated(false);
  }

  const setFilterForFolloweeFavs = () => {
    setShowFolloweeFavs(true);
    setWaterListUpdated();
  }

  const setShouldShowAllWaters = () => {
    setShowAllWaters(true);
    setWaterListUpdated();
  }

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const setShouldSearchForName = (values) => {
    setShowWatersByName(values.name);
    setWaterListUpdated();
  }

  const Water = (val) => {
    const [editing, setEditing] = useState(false)

    const submitWater = (values) => {
      Axios.post('http://localhost:5000/waters/edit/' + val.val.water_id, values).then((response) => {
        console.log(response.data)
      })
      setEditing(false)
    }

    const deleteWater = () => {
      Axios.post('http://localhost:5000/waters/delete/' + val.val.water_id).then((response) => {
        console.log(response.data)
      })
    }

    const setEditingWater = () => {
      setEditing(true);
    }

    const handleViewDetails = () => {
      history.push(`/waters/${val.val.water_id}`)
    }

    const showEditForm = () => {
      if (editing) {
        return (
          <Form
            {...layout}
            name="basic"
            onFinish={submitWater}
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
        <h1>Water Name: {val.val.water_name} </h1>
        <Button variant="contained" onClick={handleViewDetails}> View Details</Button>
        <Button variant="contained" onClick={setEditingWater}> Edit</Button>
        <Button variant="contained" onClick={deleteWater}> Delete</Button>
        {showEditForm()}
      </Paper>
    )
  }

  return (
    <div className="WaterGallery">
      <h1> Waters </h1>
      {updateWaterList()}
      <div className="form">
        <Button variant="contained" onClick={setWaterListNeedsUpdate}> Update</Button>
        <br></br>
        <Button variant="contained" onClick={setShouldShowAllWaters}> Show All Waters</Button>
        <br></br>
        <Button variant="contained" onClick={setFilterForFolloweeFavs}> Show Favorite Waters of Users You Follow</Button>
        <br></br>
        <div className={sliderClasses.root}>
          <Typography id="continuous-slider" gutterBottom>
            FILTER BY RATING
          </Typography>
          <Slider value={sliderValue} onChange={handleSliderChange} valueLabelDisplay="auto"
                  step={0.1}
                  marks
                  min={0}
                  max={5} />
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
            {waterList.map((val, index) => {
              return (
                <Grid key={index}>
                  <Water val={val} />
                </Grid>
              );
            })}
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default WaterGallery;