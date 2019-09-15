const fs= require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><h1>Greetings from Atuli </h1></body>');
        res.write('<ul><li>User1</li></ul>');
        res.write('<body><form action="/create-user" method="POST"><input type="username" name="username"></input><button type="submit">Submit User</button> </form></body');
        res.write('</html>');
        return res.end();
    }
    
    if(url ==='/create-user' && method ==='POST'){
        const body = [];
        req.on('data',(chunk) => { //data = the buffer thing 
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const username = parsedBody.split('=')[1];
            console.log(username);
        });
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
    }
    
};

module.exports = requestHandler;
