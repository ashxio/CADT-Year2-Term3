// server.js
const http = require('http');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    console.log(`Received ${method} request for ${url}`);

    switch(true) {
        case (url === '/' && method === 'GET'):
            res.writeHead(200, { 'Content-Type': 'text/html' });
            return res.end(`
                <html>
                    <head><title>Home</title></head>
                    <body>
                        <h1>Welcome to the Home Page</h1>
                        <p>This is a simple Node.js server.</p>
                    </body>
                </html>
            `);
            break;

        case (url === '/about' && method === 'GET'):
            res.writeHead(200, {"content-type": 'text/html' });
            return res.end(`
                <html>
                    <head><title>About</title></head>
                    <body>
                        <h1>Welcome to the about page</h1>
                        <p>About us: at CADT, we love node.js!</p>
                    </body>
                </html>   
            `);
            break;

        case (url === '/contact-us' && method === '/GET'):
            res.writeHead(200, {"content-type": 'text/html' });
            return res.end(`
                <html>
                    <head><title>Contact</title></head>
                    <body>
                        <h1>Welcome to the Contact page</h1>
                        <p>You can reach us vai email…</p>
                    </body>
                </html>   
            `); 
            break;
            
        case (url === '/products' && method === 'GET'):
            res.writeHead(200, {"content-type": 'text/html' });
            return res.end(`
                <html>
                    <head><title>products</title></head>
                    <body>
                        <h1>Welcome to the products page</h1>
                        <p>Buy one get one…</p>
                    </body>
                </html>   
            `); 
            break;
        
        case (url === '/projects' && method === 'GET'):
            res.writeHead(200, {"content-type": 'text/html' });
            return res.end(`
                <html>
                    <head><title>projects</title></head>
                    <body>
                        <h1>Welcome to the projects page</h1>
                        <p>Here are our awesome projects</p>
                    </body>
                </html>   
            `); 
            break;
        
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});