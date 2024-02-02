const express = require('express');
const app = express();
const dotenv = require('dotenv');
const chats = require('../backend/chat');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouter')
dotenv.config()
connectDB()
app.use(cors());
app.use('/api/user',userRoutes)

const port = process.env.PORT || 2001;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
