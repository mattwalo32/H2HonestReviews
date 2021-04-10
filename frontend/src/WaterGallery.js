import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

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

  const [sliderValue, setSliderValue] = React.useState(30);
  
  const dummyData = [{waterName: "Water", waterManufacturer: "Manufacturer", waterAvgRating: 5}]
  /*                    
  useEffect(() => {
    Axios.get('http://localhost:3002/api/get_waters').then((response) => {
      setWaterList(response.data)
    })
  },[])*/

  const updateWaterList = () => {
    console.log(waterListUpdated)
    if (!waterListUpdated) {
      setWaterListUpdated(true);
      setWaterList(waterList.concat(dummyData));
    }
  }

  const setWaterListNeedsUpdate = () => {
    setWaterListUpdated(false);
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
        <Button variant="contained" onClick={setWaterListNeedsUpdate}> Show Favorite Waters of Users You Follow</Button>
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
                <Grid key={index} item>
                  <Paper className={gridClasses.paper}>
                    <h1>Water Name: {val.waterName} </h1>
                    <p>Manufacturer: {val.waterManufacturer}</p>
                    <p>Average Rating: {val.waterAvgRating}/5</p>
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