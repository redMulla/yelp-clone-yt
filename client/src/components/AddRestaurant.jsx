import React, { useContext, useState } from 'react'
import { RestaurantContext } from '../context/RestaurantsContext'

function AddRestaurant() {
    const {addRestaurants} = useContext(RestaurantContext)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/api/v1/restaurants', {
            method: 'POST',
            body: JSON.stringify({
                name,
                location,
                price_range: priceRange
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.json()
        })
        .then(responseData => {
            addRestaurants(responseData.data.restaurant)
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div className='mb-4'>
        <form action="">
            <div className="input-group mb-3">
                <div className="col">
                    <input value={name} onChange = {e => setName(e.target.value)} type="text" className='form-control' placeholder='name'/>
                </div>
                <div className="col">
                    <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder='location'/>
                </div>
                <div className="col">
                    <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select" id="inputGroupSelect01">
                        <option disabled>Price Range</option>
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <button onClick={handleSubmit} type='submit' className="btn btn-primary">Add</button>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant