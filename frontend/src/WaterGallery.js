import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Menu} from "antd";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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
  const [tempStorage, setTempStorage] = useState(0)
  const [waterList, setWaterList] = useState([]);

  const [filter, setFilter] = useState('none')
  const history = useHistory();

  const FilterOptions = () => {
    const [alignment, setAlignment] = React.useState('nont');

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
      setFilter(newAlignment)
    };

    const handleShowAllWaters = () => {
      Axios.get('http://localhost:5000/waters').then((response) => {
        if (response.data['success'] == true)
          console.log(response.data.response)
          if (response.data.response == null) {
            setWaterList([])
          } else {
            setWaterList(response.data.response)
          }
      })
    }

    const handleShowFollowingFavs = () => {
      Axios.get('http://localhost:5000/following/favorites/7').then((response) => {
        if (response.data['success'] == true)
          console.log(response.data.response)
          if (response.data.response == null) {
            setWaterList([])
          } else {
            setWaterList(response.data.response)
          }
      })
    }

    return (
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="none" aria-label="left aligned" onClick={handleShowAllWaters}>
          Show All Waters
        </ToggleButton>
        <ToggleButton value="following" aria-label="centered" onClick={handleShowFollowingFavs}>
          Show Favorites of Users You Follow
        </ToggleButton>
        <ToggleButton value="rating" aria-label="right aligned">
          Filter By Rating
        </ToggleButton>
        <ToggleButton value="name" aria-label="justified">
          Filter By Name
        </ToggleButton>
      </ToggleButtonGroup>
    )
  }

  const NameFilter = () => {
    const [name, setName] = useState('')

    const handleTextChange = (event) => {
      setName(event.target.value)
    }

    const handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        event.preventDefault();
        filterByName()
      }
    }

    const filterByName = () => {
      Axios.get('http://localhost:5000/waters/name/' + name).then((response) => {
        if (response.data['success'] == true)
          console.log('response: ' + response.data.response)
          if (response.data.response == null) {
            setWaterList([])
          } else {
            setWaterList(response.data.response)
          }
      })
    }

    if (filter == 'name') {
      return (
        <form noValidate autoComplete="off">
          <TextField id="outlined-basic" label="Name" variant="outlined" onChange={handleTextChange} onKeyPress={handleKeyPress}/>
        </form>
      )
    }
    return null
  }

  const SliderFilter = () => {
    const sliderClasses = useStylesSlider();
    const [sliderValue, setSliderValue] = React.useState(tempStorage);

    const handleSliderChange = (event, newValue) => {
      Axios.get(`http://localhost:5000/water/byminrating/${newValue}`).then((response) => {
        if (response.data['success'] == true)
          setWaterList(response.data.response)
      })
      setTempStorage(newValue)
    };

    if (filter == 'rating') {
      return (
        <div className={sliderClasses.root}>
            <Typography id="continuous-slider" gutterBottom>
              Rating
            </Typography>
          <Slider value={sliderValue} onChange={handleSliderChange} valueLabelDisplay="auto"
            step={0.1}
            marks
            min={0}
            max={5} />
        </div>
      )
    }
    return null
  }

  const Water = (val, index) => {
    const [editing, setEditing] = useState(false)
    const [newName, setNewName] = useState('')

    const [alignment, setAlignment] = React.useState('view');

    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
      setFilter(newAlignment)
    };

    const submitWater = () => {
      Axios.post('http://localhost:5000/waters/edit/' + val.val.water_id, newName).then((response) => {
        console.log(response.data)
      })
      setEditing(false)
    }

    const deleteWater = () => {
      Axios.post('http://localhost:5000/waters/delete/' + val.val.water_id).then((response) => {
        console.log(response.data)
        setWaterList(waterList.filter((_, i) => i != index))
      })
    }

    const setEditingWater = () => {
      setEditing(true);
    }

    const handleViewDetails = () => {
      history.push(`/waters/${val.val.water_id}`)
    }

    const handleTextChange = (event) => {
      setNewName(event.target.value)
    }

    const handleKeyPress = (event) => {
      if(event.key == 'Enter'){
        event.preventDefault();
        submitWater()
      }
    }

    const showEditForm = () => {
      if (editing) {
        return (
          <form noValidate autoComplete="off">
            <TextField id="outlined-basic" label="New Name" onChange={handleTextChange} onKeyPress={handleKeyPress}/>
          </form>
        )
      }
    }

    return (
      <Paper className={gridClasses.paper}>
        <h1>Water Name: {val.val.water_name} </h1>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="view" aria-label="left aligned" onClick={handleViewDetails}>
            View Details
          </ToggleButton>
          <ToggleButton value="edit" aria-label="centered" onClick={setEditingWater}>
            Edit
          </ToggleButton>
          <ToggleButton value="delete" aria-label="right aligned" onClick={deleteWater}>
            Delete
          </ToggleButton>
        </ToggleButtonGroup>
        {showEditForm()}
      </Paper>
    )
  }

  return (
    <div className="WaterGallery">
      <h1> Waters </h1>
      <div className="form">
        <FilterOptions />
        <br></br>
        <SliderFilter />
        <NameFilter />
        <br/>
        <div className={gridClasses.root}>
          <Grid container spacing={3}>
            {waterList.map((val, index) => {
              return (
                <Grid key={index}>
                  <Water val={val} index={index} />
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