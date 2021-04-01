import React, { useEffect, useState } from 'react'
import { Rating } from '@material-ui/lab'

const MOCK_WATER_DATA = {
    name: "Kirkland",
    imageURL: "https://media.istockphoto.com/photos/water-bottle-on-white-background-picture-id1126933760?k=6&m=1126933760&s=612x612&w=0&h=_ekI__thTuuhyQ5avoB81g7qnBm6Un5pq7AMVBPRruk=",
    averageRating: 3.0,
}

const DetailsPage = () => {
    const [waterData, setWaterData] = useState(null)

    useEffect(() => {
        const getWaterData = async () => {
            // TODO: Replace with actual API call
            setWaterData(MOCK_WATER_DATA)
        }

        getWaterData();
    })

    const renderRatingStatistic = (name, value) => {
        console.log(value)
        return (
            <div>
                <h3>{name}</h3>
                <Rating
                    name={name}
                    defaultValue={value}
                    precision={0.5}
                    readOnly
                />
            </div>
        )
    }


    const renderReviews = () => {
        return (
            <div>
            { renderRatingStatistic("Rating", waterData?.averageRating) }
            { renderRatingStatistic("Taste", waterData?.averageRating) }
            { renderRatingStatistic("Price", waterData?.averageRating) }
            { renderRatingStatistic("Mouth Feel", waterData?.averageRating) }
            { renderRatingStatistic("Portability", waterData?.averageRating) }
            { renderRatingStatistic("Packaging Quality", waterData?.averageRating) }
            </div>
        )
    }

    return (
        <div>
            <h1>{waterData?.name}</h1>
            <img src={waterData?.imageURL} />
            { renderRatingStatistic("Average Rating", waterData?.averageRating) }
            { renderReviews() }
        </div>
    )
}

export default DetailsPage