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

class LocalStorageMixin {
    constructor() {
        this.storage = window.localStorage;
    }
    // Local storage: получаем данные
    _getLocalStorage(key) {
        return JSON.parse(this.storage.getItem(key));
    };

    // Local storage: пишем данные
    _setLocalStorage(key, value) {
        this.storage.setItem(key, JSON.stringify(value));
        console.log('Save localStorage!');
    };

    // Очищаем Local storage
    _clearLocalStorage() {
        this.storage.clear();
    };
};

class DrawingMixin extends LocalStorageMixin {
    constructor() {
        super();
        this.modal = document.querySelector('#goodsModal');
        this.windowBasket = document.querySelector('#basketModal');
        this.modalBasket = document.createElement('div');
    };

    

    // Отрисовываем кол-во и сумму карзины в шапке
    renderBasket(basketList) {
        document.getElementById('cartCounter').innerHTML = basketList.countGoods;
        document.getElementById('headerPrice').innerHTML = `${basketList.amount} руб.`;
    };

    //Рисуем заголовок корзины
    drawBasketTitle(message) {
        const basketTitle = document.createElement('h2');
        basketTitle.classList.add('basket__title');
        basketTitle.textContent = message;

        this.modalBasket.appendChild(basketTitle);
    };

    //Если корзина пустая, скажем об этом
    drawBasketEmpty(messages) {
        const wrap = document.createElement('p');
        wrap.textContent = messages;

        this.modalBasket.appendChild(wrap);
    };

    //Отрисовываем корзину с товарами в виде таблицы
    drawBasketProduct(product, listProduct){
        const goods = document.createElement('li');
        goods.className = 'goods__item';

        const goodsLeft = document.createElement('div');
        goodsLeft.className = 'goods__left';

        const goodsTitle = document.createElement('h3');
        goodsTitle.className = 'goods__title';
        goodsTitle.textContent = product.product_name;

        goodsLeft.appendChild(goodsTitle);

        const goodsRight = document.createElement('div');
        goodsRight.className = 'goods__right';

        const goodsNum = document.createElement('p');
        goodsNum.className = 'goods__number';
        goodsNum.textContent = `${product.quantity}`;

        goodsRight.appendChild(goodsNum);

        goods.appendChild(goodsLeft);
        goods.appendChild(goodsRight);

        listProduct.appendChild(goods);

        this.modalBasket.appendChild(listProduct);

    };

    //Отрисовываем "close" модального окна
    drawBasketClose() {
        const closeModal = document.createElement('button');
        closeModal.setAttribute('class', 'button__close');
        closeModal.setAttribute('type', 'button');

        const closeImg = document.createElement('img');
        closeImg.setAttribute('class', 'close');
        closeImg.setAttribute('src', 'img/close.svg');
        closeImg.setAttribute('alt', 'Close');

        closeModal.appendChild(closeImg);

        this.modalBasket.appendChild(closeModal);

        closeModal.addEventListener('click', this._onToggleBasket.bind(this))
    };

    //Отрисовываем сепаратор
    drawSeparator() {
        const separator = document.createElement('hr');
        separator.className = 'separator';

        this.modalBasket.appendChild(separator);
    };

    //Отрисовываем итог корзины
    drawBasketTotal(basketList) {
        const total = document.createElement('div');
        total.className = 'total';

        const totalText = document.createElement('p');
        totalText.className = 'total__text';
        totalText.textContent = 'Итого: ';

        const totalNum = document.createElement('div');
        totalNum.className = 'total__num';
        totalNum.textContent = `${basketList.amount} руб.`

        total.appendChild(totalText);
        total.appendChild(totalNum);

        this.modalBasket.appendChild(total);
    };

    //Отрисовываем корзину в модальное окно
    drawModalBasket(basketList, sumBasket) {
        this.modalBasket.className = 'basket-modal__content';
        this.modalBasket.textContent = '';

        this.drawBasketClose();

        if (this.basketList.countGoods == 0){
            this.drawBasketTitle('Корзина: ');
            this.drawSeparator();
            this.drawBasketEmpty('Ваша корзина пуста!');
        } else {
            this.drawBasketTitle('Корзина: ');
            this.drawSeparator();

            const listProduct = document.createElement('ul');
            listProduct.className = 'basket__list';

            basketList.contents.forEach(el => {
                this.drawBasketProduct(el, listProduct);
            });

            this.drawSeparator();

            this.drawBasketTotal(basketList);
            // this.drawButtonNext();

        };
        this.windowBasket.appendChild(this.modalBasket);
    };
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

class GoodsList extends DrawingMixin{
    constructor() {
        super();
        this.goods = [];
    };

    fethGoods() {
        if (this._getLocalStorage('catalog')) {
            this.goods = this._getLocalStorage('catalog');
            this.render();
            // this._clearLocalStorage();
        } else {
            fetch(`${API_URL}catalogData.json`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this.goods = this._setLocalStorage('catalog', request);
                this.goods = request;
                this.render();
            })
            .catch((error) => {
                console.log(error.text);
            });
        };
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
            let goodsItem = new Goods(good.id_product, good.product_name, good.price);
            listHtml += goodsItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    };
};

class BasketItem extends Goods{
    constructor(id, title, price, discount = 0) {
        super(id, title, price)
        this.discount = discount; // Указывается в процентах - 20%, 30% и т.д.
    };

    // Полное описание товара в корзине
    getDescription() {
        console.log(`${this.title} с ценой = ${this.price}`);
    };
};

class Basket extends DrawingMixin {
    constructor() {
        super();
        this.basketList = []; // [{goods: BasketItem {...}, ammount: 1}, ]
        this.urlBasket = "getBasket.json";
        this.urlAddToBasket = "addToBasket.json";
        this.urlDeleteFromBasket = "deleteFromBasket.json";

        this._btn = document.getElementById('headerButton');
        this._btn.addEventListener('click', this._onToggleBasket.bind(this));
    };

    // Обработчик нажатия на корзину
    _onToggleBasket() {
        this.modal.classList.toggle("basket-modal__active");
        this.drawModalBasket(this.basketList);
    };

    // Получаем корзину с сервера
    fetchBasket() {
        if (this._getLocalStorage('basket')) {
            this.basketList = this._getLocalStorage('basket');
            // this._clearLocalStorage();
        } else {
            fetch(`${API_URL}${this.urlBasket}`)
            .then((response) => {
                return response.json();
            })
            .then((request) => {
                this._setLocalStorage('basket', request);
                this.basketList = request;
            })
            .then(() => { this.renderBasket() })
            .catch((error) => {
                console.log(error.text);
            })
        };
        this.renderBasket(this.basketList);
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
                    // this.basketList.countGoods += request.result;
                    // this.basketList.amount += resultArr[0].price;
                    this.getSumBasket();
                } else {
                    let list = this._getLocalStorage('catalog');
                    let filte_list = list.filter(item => {
                        return item.id_product === Number(id);
                    });
                    filte_list[0].quantity = 1;
                    this.basketList.contents.push(filte_list[0]);
                    };
                    this.getSumBasket();
            })
            .then(() => { this.renderBasket(this.basketList) })
            .catch((error) => { console.log(error.text) })
        
    };

    // Удаляет товар из корзины
    removeGoodsBasket(id) {
        fetch(`${API_URL}${this.urlDeleteFromBasket}`)
            .then((response) => {
                return response.json();
            })
            .then(request => {
                if (request.result) {
                    this.basketList.contents.forEach((el, i) => {
                        if (el.id_product === Number(id)) {
                            if (el.quantity <= 0) {
                                this.basketList.contents.splice(i, 1);
                            } else {
                                el.quantity -= request.result;
                                console.log('Кол-во товара уменьшено!');
                                // this.basketList.countGoods -= request.result;
                                // this.basketList.amount -= el.price;
                                this.getSumBasket();
                            };
                        };
                    });
                };
            })
            .then(() => { this.renderBasket(this.basketList) })
            .catch((error) => { console.log(error.text) })
    };

    // Сумма всей корзины
    getSumBasket() {
        let totalAmount = 0;
        let totalQuantity = 0;
        this.basketList.contents.forEach(item => {
            totalAmount += item.price * item.quantity;
            totalQuantity += item.quantity;
        });
        this.basketList.amount = totalAmount;
        this.basketList.countGoods = totalQuantity;
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

    //Запускаем отрисовку
    render() {
        this.getSumBasket();
        this.drawModalBasket(this.basketList);
    };
};

const list = new GoodsList();
list.fethGoods(() => {
    list.render();
});


const basket = new Basket();
basket.fetchBasket(() => {
    basket.render();
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
