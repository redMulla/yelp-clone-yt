import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

const AddReview = () => {
    const {id} = useParams();
    const location = useLocation()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState('Rating')

    const handleSubmitReview = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3003/review/api/v1/restaurants/${id}`, {
            method: 'POST',
            body: JSON.stringify({
                name,
                review: reviewText,
                rating
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => response.json())
        .then( data => {
            navigate("/");
            navigate(location.pathname)
        })
        .catch(err => {
            console.log(err)
        })
    }

  return (
    <div className='mb-2'>
        <form action="">
            <div className='form-row' >
                <div className="form-group col-8">
                    <label htmlFor="name">Name</label>
                    <input id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='name' type="text" className='form-control'/>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="rating"></label>
                    <select value={rating} onChange={(e) => setRating(e.target.value)} id="rating" className="custom-select">
                        <option disabled>Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea id='review' value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="form-control"></textarea>
                <button type='submit' className="btn btn-primary" onClick={handleSubmitReview}>
                    Submit
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddReview