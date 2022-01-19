const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.COMPASS_URI, {useNewUrlParser:true})
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connection established successfully")
})

app.use('/api/user', require("./routes/User"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));