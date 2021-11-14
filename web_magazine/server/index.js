// const fs = require('fs');

// const data = [];

// for(let i = 0; i < 10; i++) {
//     data.push({id: i, title: `object#${i}`});
// };

// console.log(data);

// fs.writeFile('./data.json', JSON.stringify(data), () => {
//     console.log('done');
// });

// fs.readFile('./data.json', 'utf-8', (err, data) => {
//     const arr = JSON.parse(data);

//     arr.push({id: 10, title: 'new object'});

//     fs.writeFile('./data.json', JSON.stringify(arr), () => {
//         console.log('done');
//     });
// });



const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});