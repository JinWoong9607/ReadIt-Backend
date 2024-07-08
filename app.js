const sync = require('./models/sync');
sync();

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const checkAuth = require('./routers/authorization');
const userRouter = require('./routers/userRouter');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use((_, res) => {
    res.status(404).send('404 Not Found');
});
app.listen(port);