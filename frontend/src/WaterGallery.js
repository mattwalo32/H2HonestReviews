import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function WaterGallery() {
  const classes = useStyles();

  const [waterList, setWaterList] = useState([]);
  const [waterListUpdated, setWaterListUpdated] = useState(false);
  
  const dummyData = [{waterName: 'Water', waterManufacturer: 'Manufacturer', 
                      waterAvgRating: 5, waterAvgTaste: 5, waterAvgPrice: 5, 
                      waterAvgMouthFeel: 5, waterAvgPortability: 5, waterAvgPackQual: 5}]
  /*                    
  useEffect(() => {
    Axios.get('http://localhost:3002/api/get_waters').then((response) => {
      setWaterList(response.data)
    })
  },[])*/

  const updateWaterList = () => {
    console.log(waterListUpdated)
    if (!waterListUpdated) {
      console.log("here!")
      setWaterListUpdated(true);
      setWaterList(waterList.concat(dummyData));
    }
  }

  const setWaterListNeedsUpdate = () => {
    setWaterListUpdated(false);
  }

  return (
    <div className="WaterGallery">
      <h1> Waters </h1>
      {updateWaterList()}
      <div className="form">
        <div className={classes.root}>
          <Grid container spacing={3}>
            {waterList.map((index, val) => {
              return (
                <Grid key={index} item>
                  <Paper className={classes.paper}>
                    <h1>Water Name: {val.waterName} </h1>
                    <p>Manufacturer: {val.waterManufacturer}</p>
                    <p>Average Rating: {val.waterAvgRating}/5</p>
                    <p>Average Taste: {val.waterAvgTaste}/5</p>
                    <p>Average Price: {val.waterAvgPrice}/5</p>
                    <p>Average Mouth Feel: {val.waterAvgMouthFeel}/5</p>
                    <p>Average Portability: {val.waterAvgPortability}/5</p>
                    <p>Average Packaging Quality: {val.waterAvgPackQual}/5</p>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <button onClick={setWaterListNeedsUpdate}> Update</button>
      </div>
    </div>
  );
}

export default WaterGallery;