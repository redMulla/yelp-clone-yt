const db = require('../db/index')
const router = require('express').Router()

// get all restaurants
router.get('/api/v1/restaurants', async (req, res) => {
    try{
        const results = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;');

        res.status(200).json({
            status: 'success',
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch(err) {
        console.log(err)
    }
});

// get one restaurant
router.get('/api/v1/restaurants/:id', async (req, res) =>{
    try{
        const results = await db.query('SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1',
         [req.params.id]);
        const reviews = await db.query('SELECT * FROM reviews WHERE restaurant_id = $1',
         [req.params.id]);
        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0],
                reviews: reviews.rows
            }
        })
    } catch (err) {
        console.log(err)
    }
});

// Create a restaurant
router.post('/api/v1/restaurants', async (req, res) => {
    try{
        const results = await db.query('INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *',
        [req.body.name, req.body.location, req.body.price_range]);
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch (err) {
        console.log(err)
    }
});

// Update a restaurant

router.put('/api/v1/restaurants/:id', async (req, res) => {
    try{
        const results = await db.query('UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *',
        [req.body.name, req.body.location, req.body.price_range, req.params.id])

        res.status(200).json({
            status: 'success',
            data: {
                restaurant: results.rows[0]
            }
        })
    } catch(err) {
        console.log(err)
    }
})

// delete a restaurant
router.delete('/api/v1/restaurants/:id', async (req, res) => {
    try{
        const results = await db.query('DELETE FROM restaurants WHERE id = $1', [req.params.id])
        res.status(204).json({
            status: 'success'
        })
    } catch(err) {
        console.log(err)
    }
})


module.exports = router;