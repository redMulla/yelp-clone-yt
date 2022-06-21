import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AddReview from '../components/AddReview'
import Reviews from '../components/Reviews'
import StarRating from '../components/StarRating'
import { RestaurantContext } from '../context/RestaurantsContext'

function RestaurantDetailPage() {
    const {id} = useParams()
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext)

    useEffect(() => {
        fetch(`/api/v1/restaurants/${id}`)
          .then(response => response.json())
          .then(data => setSelectedRestaurant(data.data))
          .catch(err => console.log(err))

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>{selectedRestaurant && (
        <>
        <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
        <div className="text-center">
          <StarRating rating={selectedRestaurant.restaurant.average_rating} />
          <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : '(0)'}
          </span>
        </div>
        <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
            <AddReview />
        </div>
        </>
    )}</div>
  )
}

export default RestaurantDetailPage