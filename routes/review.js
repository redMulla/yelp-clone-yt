const db = require('../db')
const router = require('express').Router();

router.post('/api/v1/restaurants/:id', async (req, res) => {
    try {
        const newReview = await db.query('INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *;',
        [req.params.id, req.body.name, req.body.review,
        req.body.rating])
        res.status(201).json({
            status: 'success',
            data: {
                review: newReview.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router