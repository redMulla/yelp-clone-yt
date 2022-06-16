import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function UpdateRestaurant() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')

    useEffect(()=> {
        fetch(`http://localhost:3003/api/v1/restaurants/${id}`)
          .then(response => response.json())
          .then(data => {
              setName(data.data.restaurant.name)
              setLocation(data.data.restaurant.location)
              setPriceRange(data.data.restaurant.price_range)
          })
          .catch(err => {
              console.log(err)
          })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3003/api/v1/restaurants/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                location,
                price_range: priceRange
            })
        })
          .then(response => response.json())
          .then(data => navigate('/'))
          .catch(err => {
              console.log(err)
          })
    }

  return (
    <div>
        <form action="">
            <div className='form-group'>
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} id='name' className='form-control' type="text" />
            </div>
            <div className='form-group'>
                <label htmlFor="location">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} id='location' className='form-control' type="text" />
            </div>
            <div className='form-group'>
                <label htmlFor="price_range">Name</label>
                <input value={priceRange} onChange={(e) => setPriceRange(e.target.value)} id='price_range' className='form-control' type="number" min="1" max="5" />
            </div>
            <button type='submit' onClick={handleSubmit} className='btn btn-primary'>Submit</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant