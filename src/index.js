const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const db = require('./app/configs/db');

const app = express();
const port = process.env.PORT || 4000;

// Import Routers
const authRouter = require('./routers/auth');
const userRouter = require('./routers/user');

// Config .env
dotenv.config();
db.connect();

// HTTP Logger
app.use(morgan('combined'));
app.use(cors());
app.use(cookieParser());

// Middleware
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server is starting at localhost:${port}`));
