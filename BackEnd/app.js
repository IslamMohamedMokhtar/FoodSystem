//imports
const authRouter = require('./routes/authRoutes');
const menuRouter = require('./routes/menuRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const profileRouter = require('./routes/profileRoutes');
const picRouter = require('./routes/pictureRoutes');
const userRouter = require('./routes/userRoutes');
//modules
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { dbURI } = require('./constants');
const app = express();
const cors = require('cors');



mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => app.listen(3001))
    .catch(err => console.log(err));
app.set('view engine', 'ejs');

//app.set('views', 'View');
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//routes
app.get('/', (req, res) => {

    res.json('Home');
});

app.use('/menus', menuRouter);
app.use('/bookings', bookingRouter);
app.use('/profile', profileRouter);
app.use('/picture', picRouter);
app.use('/user', userRouter);
app.use(authRouter);
// 404 page

app.use((req, res, next) => {
    return res.status(404).json('404', { title: '404' });
});
