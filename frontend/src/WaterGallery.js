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


function WaterGallery() {
  const gridClasses = useStylesGrid();
  const sliderClasses = useStylesSlider();

  const [waterList, setWaterList] = useState([]);
  const [waterListUpdated, setWaterListUpdated] = useState(false);

  const [showFolloweeFavs, setShowFolloweeFavs] = useState(false);
  const [sliderValue, setSliderValue] = React.useState(30);
  const history = useHistory();

  const updateWaterList = () => {
    if (!waterListUpdated) {
      if (showFolloweeFavs) {
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

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <div className="WaterGallery">
      <h1> Waters </h1>
      {updateWaterList()}
      <div className="form">
        <Button variant="contained" onClick={setWaterListNeedsUpdate}> Update</Button>
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
        </div>
        <div className={gridClasses.root}>
          <Grid container spacing={3}>
            {waterList.map((val, index) => {
              return (
                <Grid key={index} item onClick={() => { history.push(`/waters/${val.water_id}`)}}>
                  <Paper className={gridClasses.paper}>
                    <h1>Water Name: {val.water_name} </h1>
                  </Paper>
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