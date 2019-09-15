const fs= require('fs');

const requestHandler = (req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button> </form></body');
        res.write('</html>');
        return res.end();
    }
    
    if(url ==='/message' && method ==='POST'){
        const body = [];
        req.on('data',(chunk) => { //data = the buffer thing 
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt',message, err=> { //asicronos way this is better than sync way
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            }); //fs.writeFileSync for sincronos way
        });
    }
    
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>hello World </h1></body');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;

