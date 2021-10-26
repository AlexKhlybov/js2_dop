const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/"

function send(url, method = "GET", data = {}, headers = {}, timeout = 60000) {
    return new Promise((res, rej) => {
        var xhr;

        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        };
        
        Object.entries(headers).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value);
        });
        
        xhr.timeout = timeout;
        xhr.ontimeout = function () {
            // Этот код выполняется, если превышено время ожидания
            rej();
        };
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
            // Этот код выполняется после получения ответа
                if (xhr.status < 400) {
                    res(xhr.responseText);
                } else if (xhr.status >= 400) {
                    rej(xhr.responseText);
                };
            };
        };
    
        xhr.open(method, url, true);
        xhr.send(method, JSON.stringify(data));
    })
};

class Goods {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    };

    render() {
        return `<div class="card  col  col-md-6  col-sm-12  m-3" style="width: 18rem;">
                    <img src="img/6.jpg" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${this.title}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <p>${this.price} р.</p>
                        <div class="d-flex">
                            <button class="btn  btn-success  w-100  btn-sm  mx-1  btn--plus" data-id="${this.id}">Добавить</button>
                            <button class="btn  btn-danger  w-100  btn-sm  mx-1  btn--minus" data-id="${this.id}">Удалить</button>
                        </div>
                    </div>
                </div>`;
    };
};

class GoodsList {
    constructor() {
        this.goods = [];
    };

    fethGoods() {
        fetch(`${API_URL}catalogData.json`)
        .then((response) => {
            return response.json();
        })
        .then((request) => {
            this.goods = request.map(good => ({title: good.product_name, price: good.price, id: good.id_product}));
            this.render();
        })
        .catch((error) => {
            console.log(error.text);
        });
    };

    getSumPrice() {
        let fullSum = 0;
        this.goods.forEach(item => {
            fullSum += item.price;
        });
        return fullSum;
    };

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            let goodsItem = new Goods(good.id, good.title, good.price);
            listHtml += goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    };
};

class BasketItem {
    constructor(id, title, price, discount = 0) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.discount = discount; // Указывается в процентах - 20%, 30% и т.д.
    };

    // Полное описание товара в корзине
    getDescription() {
        console.log(`${this.title} с ценой = ${this.price}`);
    };
};

class Basket {
    constructor() {
        this.basketList = []; // [{goods: BasketItem {...}, ammount: 1}, ]
        this.urlBasket = "getBasket.json"
        this.urlAddToBasket = "addToBasket.json"
        this.urlDeleteFromBasket = "deleteFromBasket.json"
    };

    // Получаем корзину с сервера
    fetchBasket() {
        fetch(`${API_URL}${this.urlBasket}`)
        .then((response) => {
            return response.json();
        })
        .then((request) => {
            this.basketList = request;
        })
        .then(() => { this.renderBasket() })
        .catch((error) => {
            console.log(error.text);
        })
    };

    // Отрисовываем кол-во и сумму карзины в шапке
    renderBasket() {
        console.log(this.basketList);
        document.getElementById('cartCounter').innerHTML = this.basketList.countGoods;
        document.getElementById('headerPrice').innerHTML = `${this.basketList.amount} руб.`;
        
    };

    // Добавляет товар в корзину
    addGoodsBasket(id) { 
        fetch(`${API_URL}${this.urlAddToBasket}`)
        .then((response) => {
            return response.json();
        })
        .then(request => { 
            let resultArr = this.basketList.contents.filter(item => {
                return item.id_product == id;
            });
            if (resultArr.length) {
                resultArr[0].quantity += request.result;
                console.log('Кол-во товара увеличено!');
                this.basketList.countGoods += request.result;
                this.basketList.amount += resultArr[0].price;
            };
        })
        .then(() => { this.renderBasket() })
        .catch((error) => { console.log(error.text) })
        
    };

    // Удаляет товар из корзины
    removeGoodsBasket(id) {
        fetch(`${API_URL}${this.urlDeleteFromBasket}`)
        .then((response) => {
            return response.json();
        })
        .then(request => {
            let resultArr = this.basketList.contents.filter(item => {
                return item.id_product == id;
            });
            if (resultArr.length) {
                resultArr[0].quantity -= request.result;
                console.log('Кол-во товара уменьшено!');
                this.basketList.countGoods -= request.result;
                this.basketList.amount -= resultArr[0].price;
            };
        })
        .then(() => { this.renderBasket() })
        .catch((error) => { console.log(error.text) })
    };

    // Сумма всей корзины
    getSumBasket() {
        let totalPrice = 0;
        let totalAmmount = 0;
        this.basketList.forEach(item => {
            totalPrice += item.goods.price * item.ammount;
            totalAmmount += item.ammount;
        });
        console.log(`${totalAmmount} товаров, на сумму = ${totalPrice} руб.`);
    };

    // Сумма всей корзины с учетом скидки
    getDiscountBasket() {
        let totalPrice = 0;
        let totalAmmount = 0;
        this.basketList.forEach(item => {
            totalPrice += item.goods.price * item.ammount * (this.discount = 0 ? 1: this.discount);
            totalAmmount += item.ammount;
        });
        console.log(`${totalAmmount} товаров, на сумму = ${totalPrice} руб.`);
    };
};

const list = new GoodsList();
list.fethGoods(() => {
    list.fetch();
});


const basket = new Basket();
basket.fetchBasket(() => {
    basket.renderBasket();
});


// Слушает кнопки "Добавить"
document.onclick = e => {
    if ( e.target.classList.contains('btn--plus') ){
        let idProd = e.target.dataset.id;
        basket.addGoodsBasket(idProd);
    };
};

// Слушает кнопки "Удалить"
document.addEventListener('click', function(e) {
    if ( e.target.classList.contains('btn--minus') ){
        let idProd = e.target.dataset.id;
        basket.removeGoodsBasket(idProd);
    };
});


// // Для тестов в консоли
// let item1 = new BasketItem('Хлеб', 50, 0);
// let item2 = new BasketItem('Масло', 100, 0);
// let item3 = new BasketItem('Молоко', 70, 15);

// let bask = new Basket();
// bask.addGoodsBasket(item1);
// bask.addGoodsBasket(item2);
// bask.addGoodsBasket(item3);
// bask.addGoodsBasket(item1);
// bask.addGoodsBasket(item1);
// bask.addGoodsBasket(item1);

// bask.removeGoodsBasket(item1);
// bask.removeGoodsBasket(item1);
// bask.removeGoodsBasket(item3);
// bask.printBasket();
// bask.getSumBasket();
// bask.getDiscountBasket();


// {
//     "amount": 46600,
//     "countGoods": 2,
//     "contents": [
//       {
//         "id_product": 123,
//         "product_name": "Ноутбук",
//         "price": 45600,
//         "quantity": 1
//       },
//       {
//         "id_product": 456,
//         "product_name": "Мышка",
//         "price": 1000,
//         "quantity": 1
//       }
//     ]
//   }