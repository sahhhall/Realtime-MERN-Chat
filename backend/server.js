const express = require('express');
const app = express();
const dotenv = require('dotenv');
const chats = require('../backend/chat');
const cors = require('cors');
dotenv.config()
app.use(cors());

app.get('/api/chat', (req, res) => {
  res.send(chats.chats);
});

const port = process.env.PORT || 2001;
app.listen(port, () => {
  console.log(`server running on http://localhost:${port}/`);
});
