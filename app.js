require('dotenv').config();
const express = require('express');
const cors = require('cors');

const restaurantRouter = require('./routes/restaurants');
const reviewRouter = require('./routes/review')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', restaurantRouter);
app.use('/review', reviewRouter);


const port = process.env.PORT || 3004

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
});