require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const restaurantRouter = require('./routes/restaurants');
const reviewRouter = require('./routes/review')
const port = process.env.PORT || 3003

const app = express();

app.use(cors());
app.use(express.json());
//app.use(express.static('./client/build'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))
}

app.use('/', restaurantRouter);
app.use('/review', reviewRouter);


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/built/index.html"))
})

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`)
});