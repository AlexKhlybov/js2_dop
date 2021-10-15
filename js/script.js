class Goods {
    constructor(title, price) {
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
                            <a href="#" class="btn  btn-primary  w-100" role="button">Go somewhere</a>
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
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
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
            let goodsItem = new Goods(good.title, good.price);
            listHtml += goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    };
};

class BasketItem {
    constructor(title, price, discount = 0) {
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
    };

    // Список товаров в корзине
    printBasket() {
        console.log(this.basketList);
    };

    // Добавляет товар в корзину
    addGoodsBasket(goodsItem) { 
        let resultArr = this.basketList.filter(item => {
            return item.goods == goodsItem;
        });
        if (resultArr.length) {
            resultArr[0].ammount += 1;
            console.log('Кол-во товара увеличено!');
        } else {
            this.basketList.push({goods: goodsItem, ammount: 1});
            return console.log('Товар добавлен в корзину!');
        };
    };

    // Удаляет товар из корзины
    removeGoodsBasket(goodsItem) {
        this.basketList.forEach((item, i) => {
            if (item.goods == goodsItem) {
                switch (item.ammount) {
                    case 1:
                        this.basketList.splice(i, 1);
                        console.log('Товар удален из корзины!');
                        break;
                    default:
                        item.ammount -= 1;
                        console.log('Кол-во товара уменьшено!');
                };
            };
        });
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

// const list = new GoodsList();
// list.fethGoods();
// console.log(list.getSumPrice());
// list.render();


// Для тестов в консоли
let item1 = new BasketItem('Хлеб', 50, 0);
let item2 = new BasketItem('Масло', 100, 0);
let item3 = new BasketItem('Молоко', 70, 15);

let bask = new Basket();
bask.addGoodsBasket(item1);
bask.addGoodsBasket(item2);
bask.addGoodsBasket(item3);
bask.addGoodsBasket(item1);
bask.addGoodsBasket(item1);
bask.addGoodsBasket(item1);

bask.removeGoodsBasket(item1);
bask.removeGoodsBasket(item1);
bask.removeGoodsBasket(item3);
bask.printBasket();
bask.getSumBasket();
bask.getDiscountBasket();
