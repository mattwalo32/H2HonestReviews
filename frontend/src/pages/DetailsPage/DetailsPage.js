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
    distributors: [
        {name: "Costco", city: "Gurnee"},
        {name: "Target", city: "Champaign"},
    ],
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

const DetailsPage = () => {
    const [waterData, setWaterData] = useState(null)
    const [reviews, setReviews] = useState([])
    const [liked, setLiked] = useState(false);
    let { waterId } = useParams();


    useEffect(() => {
        const getWaterData = async () => {
            // TODO: Replace with actual API call
            setWaterData(MOCK_WATER_DATA)

            // TODO: Get if the user likes this water from backend
            setLiked(false);

            const res = await axios.get(`${BASE_URL}/${waterId}/reviews`)
            setReviews(res.data.response);
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
                <h2>Water Info</h2>
                <h3>Manufacturer</h3>
                <p>Name: {waterData?.manufacturer?.name}</p>
                <p>Country: {waterData?.manufacturer?.country}</p>
                <p>Year Founded: {waterData?.manufacturer?.yearFounded}</p>

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

    const renderReviews = () => {
       if (reviews == null) 
            return null;

        return (
            reviews.map((review, index) => {
                return (
                    <div className="review-container">
                        <h2>User #{review.user_id}</h2>

                        <GridList 
                            cellHeight={175}
                            cols={3}>
                            { renderRatingStatistic("Rating", index, review.rating) }
                            { renderRatingStatistic("Taste", index, review.taste) }
                            { renderRatingStatistic("Price", index, review.price) }
                            { renderRatingStatistic("Mouth Feel", index, review.mouthFeel) }
                            { renderRatingStatistic("Portability", index, review.portability) }
                            { renderRatingStatistic("Packaging Quality", index, review.packagingQuality) }
                        </GridList>
                    </div>
                )
            })
        )
    }

    const LeaveReview = () => {
        const [userReview, setUserReview] = useState(null)

        const submitReview = () => {
            // TODO: Post to backend
            console.log(userReview)
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
                    { renderRatingStatistic("Overall Rating", 0, userReview?.rating, false, onChange) }
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