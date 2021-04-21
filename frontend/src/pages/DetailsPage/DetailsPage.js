import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './DetailsPage.css'
//import { Rating } from '@material-ui/lab'
import emptyImage from '../../assets/empty-bottle.png'
import fullImage from '../../assets/full-bottle.png'
import Rating from 'react-rating'
import { Button, Grid, GridList, GridListTile } from '@material-ui/core'
import axios from 'axios';

const BASE_URL = "http://localhost:5000"

const MOCK_WATER_DATA = {
    name: "Kirkland",
    imageURL: "https://media.istockphoto.com/photos/water-bottle-on-white-background-picture-id1126933760?k=6&m=1126933760&s=612x612&w=0&h=_ekI__thTuuhyQ5avoB81g7qnBm6Un5pq7AMVBPRruk=",
    averageRating: "3",
    // distributors: [
    //     {name: "Costco", city: "Gurnee"},
    //     {name: "Target", city: "Champaign"},
    // ],
    manufacturer: {
        name: "Kirkland",
        country: "United States",
        yearFounded: "1983",
    },
    reviews: [
        {
            name: "John Doe",
            rating: "4",
            tast: "2",
            price: "4",
            mouthFeel: "0",
            portability: "5",
            packagingQuality: "2",
        },
        {
            name: "Jane Doe",
            rating: "1",
            tast: "0",
            price: "0",
            mouthFeel: "5",
            portability: "3.5",
            packagingQuality: "2",
        }
    ]
}

const DetailsPage = ({userData}) => {
    const [waterData, setWaterData] = useState(null)
    const [reviews, setReviews] = useState([])
    const [liked, setLiked] = useState(false);
    let { waterId } = useParams();


    useEffect(() => {
        const getWaterData = async () => {
            setLiked(false);

            let res = await axios.get(`${BASE_URL}/water/${waterId}/reviews`)
            if (!res?.data?.success)
                alert("An error occurred fetching reviews")
            else
                setReviews(res.data.response);

            res = await axios.get(`${BASE_URL}/water/${waterId}`)
            if (!res?.data?.success)
                alert("An error occurred fetching water")
            else
                setWaterData(res.data.response);
        }

        getWaterData();
    }, [setWaterData])

    const onLike = () => {
        setLiked(!liked);
        // TODO: Post like status to API
    }

    const WaterInfo = () => {
        return (
            <div>
                {/* <h2>Water Info</h2>
                <h3>Manufacturer</h3>
                <p>Name: {waterData?.manufacturer?.name}</p>
                <p>Country: {waterData?.manufacturer?.country}</p>
                <p>Year Founded: {waterData?.manufacturer?.yearFounded}</p> */}

                <h3>Distributors</h3>
                {waterData?.distributors && waterData?.distributors.map((d) => {
                    return <p>{d.name} ({d.city})</p>
                })}
            </div>
        );
    }

    const renderRatingStatistic = (name, i, value, isDisabled = true, onChange =()=>{}) => {
        return (
            <GridListTile key={`${name}-${i}`} cols={1}>
                <h3>{name}</h3>
                <Rating
                    emptySymbol={<img className="icon" src={emptyImage}/>}
                    fullSymbol={<img className="icon" src={fullImage}/>}
                    value={value}
                    initialRating={value}
                    fractions={2}
                    readonly={isDisabled}
                    onChange={(newVal) => onChange(name, newVal)}
                />
            </GridListTile>
        )
    }

    const Review = ({review, index}) => {
        const [isDisabled, setIsDisabled] = useState(true);
        const [userReview, setUserReview] = useState({
            "Rating": review.rating,
            "Taste": review.taste,
            "Price": review.price,
            "Mouth Feel": review.mouth_feel,
            "Portability": review.portability,
            "Packaging Quality": review.packaging_quality,
            "user_id" : review.user_id,
            "water_id": waterId
        })

        const onChange = (property, value) => {
            const updatedReview = userReview || {};
            updatedReview[property] = value;
            setUserReview(updatedReview)
        }

        const editSaveReview = () => {
            if (!isDisabled){
                axios.put(`${BASE_URL}/reviews/${review.review_id}`, userReview)
            }

            setIsDisabled(!isDisabled);
        }

        const deleteReview = async () => {
            if(!review.review_id) {
                setReviews((reviews) => reviews.filter((r) => r.review_id != review.review_id));
                return;
            }
            const res = await axios.delete(`${BASE_URL}/reviews/${review.review_id}`)
            if (res.data.success) {
                setReviews((reviews) => reviews.filter((r) => r.review_id != review.review_id));
            } else {
                alert(JSON.stringify(res))
            }
        }

        return (
            <div className="review-container">
                <h2>User #{review.user_id}</h2>

                <GridList 
                    cellHeight={175}
                    cols={3}>
                    { renderRatingStatistic("Rating", index, userReview["Rating"], isDisabled, onChange) }
                    { renderRatingStatistic("Taste", index, userReview["Taste"], isDisabled, onChange) }
                    { renderRatingStatistic("Price", index, userReview["Price"], isDisabled, onChange) }
                    { renderRatingStatistic("Mouth Feel", index, userReview["Mouth Feel"], isDisabled, onChange) }
                    { renderRatingStatistic("Portability", index, userReview["Portability"], isDisabled, onChange) }
                    { renderRatingStatistic("Packaging Quality", index, userReview["Packaging Quality"], isDisabled, onChange) }
                </GridList>
                { review?.user_id == userData?.user_id && <Button variant="contained" color="primary" onClick={editSaveReview}>{isDisabled ? "Edit" : "Save"}</Button>}
                { review?.user_id == userData?.user_id && <Button variant="contained" color="primary" onClick={deleteReview}>Delete</Button> }
            </div>
        )
    }

    const renderReviews = () => {
       if (reviews == null) 
            return null;

        return (
            reviews.map((review, index) => {
                return <Review review={review} index={index} />
            })
        )
    }

    const LeaveReview = () => {
        const [userReview, setUserReview] = useState({
            "Rating": 0,
            "Taste": 0,
            "Price": 0,
            "Mouth Feel": 0,
            "Portability": 0,
            "Packaging Quality": 0,
            "user_id" : userData.user_id,
        })

        const submitReview = async () => {
            const res = await axios.post(`${BASE_URL}/reviews/${waterId}`, userReview)
            if (res.data.success) {
                console.log(userReview)
                setReviews((reviews) => reviews.concat([userReview]));
                alert("Review submitted")
            } else {
                alert(JSON.stringify(res))
            }
        }

        const onChange = (property, value) => {
            const updatedReview = userReview || {};
            updatedReview[property] = value;
            setUserReview(updatedReview)
        }

        return (
            <div className="review-container">
                <h1>Leave a Review!</h1>

                <GridList 
                    cellHeight={175}
                    cols={3}>
                    { renderRatingStatistic("Rating", 0, userReview?.rating, false, onChange) }
                    { renderRatingStatistic("Taste", 0, userReview?.taste, false, onChange) }
                    { renderRatingStatistic("Price", 0, userReview?.price, false, onChange) }
                    { renderRatingStatistic("Mouth Feel", 0, userReview?.mouthFeel, false, onChange) }
                    { renderRatingStatistic("Portability", 0, userReview?.portability, false, onChange) }
                    { renderRatingStatistic("Packaging Quality", 0, userReview?.packagingQuality, false, onChange) }
                </GridList>

                <Button variant="contained" color="primary" onClick={submitReview}>Submit</Button>
            </div>
        );
    }

    return (
        <div className="page-container">
            <h1>{waterData?.name}</h1>
            <img className="image" src={waterData?.imageURL} />
            <Button className="like-button" variant="contained" color={liked ? "primary" : "secondary" } onClick={onLike}>{liked ? "Unlike" : "like"}</Button> 
            <WaterInfo />

            <div className="reviews-container">
                <h2>Average Rating</h2>
                <Rating
                    emptySymbol={<img className="icon" src={emptyImage}/>}
                    fullSymbol={<img className="icon" src={fullImage}/>}
                    initialRating={waterData?.averageRating}
                    readonly
                />
            </div>

            <LeaveReview />

            <h1>See what others think</h1>
            { renderReviews() }
        </div>
    )
}

export default DetailsPage