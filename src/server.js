const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin:'http://localhost:3000'
}))

//Confugured port at localhost:3001
app.listen(3001,()=>{
    console.log('Started listening at PORT: 3001');
})