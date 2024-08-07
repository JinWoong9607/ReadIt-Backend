require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
const checkAuth = require('./routers/authorization');
const userRouter = require('./routers/userRouter');
const dictionaryRouter = require('./routers/dictionaryRouter');
const commentRouter = require('./routers/commentRouter');
const translator = require('./routers/translator');

app.use('/user', userRouter);
app.use('/comment', checkAuth, commentRouter);
app.use('/dictionary', checkAuth, dictionaryRouter);
app.use('/isAuth', checkAuth);
app.use('/translate', translator);

// Error handling
app.use((req, res) => res.status(404).send('404 Not Found'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Health check endpoint
app.get('/health', (req, res) => res.status(200).send('OK'));

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
        
        // Remove this in production
        // await sequelize.sync({ force: false, alter: true });
        // console.log('Database synchronized');

        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error('Unable to start the server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;