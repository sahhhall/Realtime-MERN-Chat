const  express = require('express')
const app  = express();
const dotenv = require('dotenv')
dotenv.config()




const port = process.env.PORT || 2001;
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}/`);
})