const express = require('express');
const fs = require('fs');

const port = 3000;
const static_dir = '../public';

const app = express();

app.use(express.json());

app.use(express.static(static_dir));

app.get('/catalogData', (req, res) => {
    fs.readFile('data/catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.get('/getBasket', (req, res) => {
    fs.readFile('data/cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.post('/addToCart', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
        let tumb = true;
    
        Array(cart)[0].forEach((el) => {
            if(el.id === item.id) {
                el.quantity += 1;
                tumb = false;
            };
        });

        if(tumb) {
            item.quantity = 1;
            cart.push(item);
        };
    
        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
          console.log('done');
          res.end();
        });
      });
});

app.delete('/removeToCart', (req, res) => {
    fs.readFile('data/cart.json', 'utf8', (err, data) => {
        const cart = JSON.parse(data);
        const item = req.body;
    
        Array(cart)[0].forEach((el, i) => {
            if(el.id === item.id) {
                el.quantity -= 1;
                if(!el.quantity) {
                    cart.splice(i, 1);
                };
            };
        });
    
        fs.writeFile('data/cart.json', JSON.stringify(cart), (err) => {
          console.log('done');
          res.end();
        });
      });
});

app.listen(port, function() {
    console.log('server is running on port ' + port + '!');
  });