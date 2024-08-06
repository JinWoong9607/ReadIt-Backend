// const sync = require('./models/sync');
// sync();
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

const checkAuth = require('./routers/authorization');
const userRouter = require('./routers/userRouter');
const dictionaryRouter = require('./routers/dictionaryRouter');
const commentRouter = require('./routers/commentRouter');
const translator = require('./routers/translator');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/comment', checkAuth);
app.use('/dictionary', checkAuth);
app.use('/comment', commentRouter);
app.use('/dictionary', dictionaryRouter);
app.use('isAuth', checkAuth);
app.use('/translate', translator);

app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

// 글로벌 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;