const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouter');
const chatRoutes = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
const { notFound, globalErrorHandler } = require('./middlewares/errorHandler');

const { initializeSocket } = require('./sockets/socket'); //socket initialization function

dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoute);
app.use(notFound);
app.use(globalErrorHandler);

const port = process.env.PORT || 2001;
const server = app.listen(port, () => {
    console.log(`server running on http://localhost:${port}/`);
});

initializeSocket(server); // Initialize  with the server instance
