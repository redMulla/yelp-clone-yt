import React, {useContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { RestaurantContext } from '../context/RestaurantsContext';
import StarRating from './StarRating'

function RestaurantList(props) {
    const {restaurants, setRestaurants} = useContext(RestaurantContext)
    let navigate = useNavigate();
    useEffect(() => {
        fetch('/api/v1/restaurants')
          .then(response => {
              return response.json()
            })
          .then(responseData => {
              return setRestaurants(responseData.data.restaurants)
          })
          .catch(err => {
              console.log(err)
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = (e, id) => {
        e.stopPropagation();
        fetch(`/api/v1/restaurants/${id}`, {
            method: 'DELETE'
        }).then ( response => {
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation(); // this is for not loading directly to the detail page because of the table row onClick event
        navigate(`/restaurants/${id}/update`);
    }

    const handleRestaurantSelect = id => {
        navigate(`/restaurants/${id}`)
    }

    const renderRating = restaurant => {
        if(!restaurant.count) {
            return <span className="text-warning">0 reviews</span>
        }

        return (
            <>
                <StarRating rating={restaurant.average_rating} />
                <span className="text-warning ml-1">{restaurant.count}</span>
            </>
        )
        }

  return (
    <div className='list-group'>
        <table className="table table-hover table-dark">
            <thead>
                <tr className="table-primary">
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return (
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key = {restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td>
                                <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button>
                            </td>
                            <td>
                                <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                })}
                {/*<tr>
                    <td>Mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>
                <tr>
                    <td>Mcdonalds</td>
                    <td>New York</td>
                    <td>$$</td>
                    <td>Rating</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                </tr>*/}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList