const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig.js');
const port = process.env.PORT || 5001;
app.use(express.json());

const usersRoute = require('./routes/usersRoute.js');
const adminRoute = require('./routes/adminRoute.js');
const bookingsRoute = require('./routes/bookingsRoute.js');
const slotsRoute = require('./routes/slotsRoute.js');
const priceRoute = require('./routes/PriceRoute.js');
const dashboardRoute = require('./routes/dashboardRoute.js');
const reportsRoute = require("./routes/reportsRoute.js");
const transactionsRoute = require("./routes/transactionsRoute.js")

app.use('/api/users', usersRoute);
app.use('/api/admin', adminRoute);
app.use('/api/slots', slotsRoute);
app.use('/api/prices', priceRoute);
app.use('/api/reports', reportsRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/transactions', transactionsRoute);
app.listen(port, () => console.log(`Listening on port ${port}`));
