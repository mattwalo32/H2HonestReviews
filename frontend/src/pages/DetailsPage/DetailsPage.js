import React, { useEffect, useState } from 'react'
import { Rating } from '@material-ui/lab'

const MOCK_WATER_DATA = {
    name: "Kirkland",
    imageURL: "https://media.istockphoto.com/photos/water-bottle-on-white-background-picture-id1126933760?k=6&m=1126933760&s=612x612&w=0&h=_ekI__thTuuhyQ5avoB81g7qnBm6Un5pq7AMVBPRruk=",
    averageRating: "3",
    reviews: [
        {
            name: "Matthew W",
            rating: "4",
            tast: "2",
            price: "4",
            mouthFeel: "0",
            portability: "5",
            packagingQuality: "2",
        }
    ]
}

const DetailsPage = () => {
    const [waterData, setWaterData] = useState(null)

    useEffect(() => {
        const getWaterData = async () => {
            // TODO: Replace with actual API call
            setWaterData(MOCK_WATER_DATA)
        }

        getWaterData();
    }, [setWaterData])

    const renderRatingStatistic = (name, value) => {
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
       if (waterData?.reviews == null) 
            return null;

        return (
            waterData.reviews.map((review) => {
                return (
                    <div>
                        <h2>{review.name}</h2>
                        { renderRatingStatistic("Rating", review.rating) }
                        { renderRatingStatistic("Taste", review.taste) }
                        { renderRatingStatistic("Price", review.price) }
                        { renderRatingStatistic("Mouth Feel", review.mouthFeel) }
                        { renderRatingStatistic("Portability", review.portability) }
                        { renderRatingStatistic("Packaging Quality", review.packagingQuality) }
                    </div>
                )
            })
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