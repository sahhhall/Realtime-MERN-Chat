const express = require('express');
const app = express();
const dotenv = require('dotenv');
const chats = require('../backend/chat');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouter');
const { notFound, globalErrorHandler } = require('./middlewares/errorHandler');
dotenv.config()
connectDB()
app.use(cors());
app.use(express.json());
app.use('/api/user',userRoutes)
app.use(notFound)
app.use(globalErrorHandler)

const port = process.env.PORT || 2001;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
