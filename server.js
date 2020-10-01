const express = require('express');
const poll=require('./Router/poll')

require('./config/db')

const app=express();

app.use(express.json({extended: false}));

app.use('/poll',poll)
const PORT= process.env.PORT || 5000;

app.get('/',(req,res)=>{
res.send("helllloooo form server")
})

app.listen(PORT, ()=>console.log(`server is raning in port ${PORT}`))