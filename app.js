const http = require('http'); //could be any name

const express = require('express');

const app = express();

app.use((req,res,nxt) =>{
    console.log('In the middleware');
    nxt(); //allows the req to cont to the next function.
});

app.use((req,res,nxt) =>{
    console.log('In another middleware');
    res.send(<h1>HEllo from express</h1>);
});

const server = http.createServer(app);

server.listen(3000); 
