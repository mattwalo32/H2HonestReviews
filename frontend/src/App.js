import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import DetailsPage from './pages/DetailsPage/DetailsPage';

function App() {
  const [movieName, setMovieName] = useState('');
  const [Review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      setMovieReviewList(response.data)
    })
  },[])

  const submitReview = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      movieName: movieName,
      movieReview: Review
    });
    
    setMovieReviewList([
      ...movieReviewList,
      {
        movieName: movieName,
        movieReview: Review
      },
    ]);
  };

  const deleteReview = (movieName) => {
    Axios.delete(`http://localhost:3002/api/delete/${movieName}`);
  };

  const updateReview = (movieName) => {
    Axios.put(`http://localhost:3002/api/update`, {
      movieName: movieName,
      movieReview: newReview
    });
    setNewReview("")
  };

  return (
    <div className="App">
      <DetailsPage />
    </div>
  );
}

export default App;
