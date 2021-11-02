const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/"

Vue.component('cart', {
    template: `<div class="basket-modal" v-if="visible" id="goodsModal">
        <div class="container">
            <div class="basket-modal__inner" id='basketModal'>
                <div class="basket-modal__content">
                    <button class="button__close" @click="onClick" type="button">
                        <img class="close" src="img/close.svg" alt="...">
                    </button>
                    <h2 class="basket__title">Корзина: </h2>
                    <hr class="separator">
                    <template v-if="!basket || !basket.length">
                        <ul class="basket__list">
                            <li class="goods__item">Нет данных</li>
                        </ul>
                        <hr class="separator">
                    </template>
                    <template v-else>
                        <ul class="basket__list">
                            <li class="goods__item" v-for="item of basket" v-bind:key="item.id_product">
                                <div class="goods__left">
                                    <h3 class="goods__title">{{ item.product_name }}</h3>
                                </div>
                                <div class="goods__right">
                                    <p class="goods__number">{{ item.quantity }}</p>
                                </div>
                            </li>
                        </ul>
                        <hr class="separator">
                        <div class="total">
                            <p class="total__text">Итого: </p>
                            <div class="total__num">{{ amount.amount }} руб.</div>
                        </div>
                    </template>
                </div><!-- ./basket-modal__content -->
            </div><!-- ./basket-modal__inner -->
        </div> <!-- ./container -->
    </div>`,
    props: {
        basket: {
            type: Array,
        },
        visible: {
            type: Boolean,
        },
        amount: {
            type: Object,
        }
    },
    methods: {
        onClick() {this.$emit('close')},
    }
});

Vue.component('write', {
    template: `<div class="basket-modal" v-if="visible">
        <div class="container">
            <div class="basket-modal__inner" id='basketModal'>
                <div class="basket-modal__content">
                    <button class="button__close" @click="onClick" type="button">
                        <img class="close" src="img/close.svg" alt="...">
                    </button>
                    <h2 class="basket__title">Форма обратной связи: </h2>
                    <hr class="separator">
                    <form class="row  g-3" name="writeForm" method="post" id="writeForm">
                        <div class="col-12">
                            <label for="inputName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="inputName">
                        </div>
                        <div class="col-12">
                            <label for="inputPhone" class="form-label">Phone</label>
                            <input type="text" class="form-control" id="inputPhone">
                        </div>
                        <div class="col-12">
                            <label for="inputEmail" class="form-label">Email</label>
                            <input type="text" class="form-control" id="inputEmail">
                        </div>
                        <div class="col-12  mb-3">
                            <label for="textarea" class="form-label">Text</label>
                            <textarea class="form-control" id="textarea" rows="3"></textarea>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-primary" type="submit" id="btnSubmit">Отправить</button>
                        </div>
                    </form>
                </div>
                <hr class="separator">
            </div><!-- /.basket-modal__inner -->
        </div><!-- /.container -->
    </div><!-- /.basket-modal -->`,
    props: {
        visible: {
            type: Boolean,
        }
    },
    methods: {
        onClick() {this.$emit('close')},
    }
});

Vue.component('search', {
    template: `<div class="d-flex">
        <input class="form-control me-2" v-model="searchLine" placeholder="Поиск" aria-label="Search">
        <button class="btn btn-outline-success" v-on:click="onclick">Поиск</button>
    </div>`,
    data() {
        return {
            searchLine: "",
        }
    },
    methods: {
        onclick() {
            this.$emit('search', this.searchLine)
        }
    },
});


new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: "",

        basketList: [],

        isVisibleWrite: false,
        isVisibleCard: false,

        patterns: {
            name: /[a-z,A-Z]+/,
            phone: /\+\d{1}\(\d{3}\)\d{3}\-\d{4}/,
            email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
            text: /.+/,
        }
    },
    methods: {
        loadGoods() {
            fetch(`${API_URL}catalogData.json`)
                .then((request) => request.json())
                .then((data) => {
                    this.goods = data;
                    this.filteredGoods = data;
                });
        },
        loadBasket() {
            fetch(`${API_URL}getBasket.json`)
                .then((request) => request.json())
                .then((data) => {
                    this.basketList = data.contents;
                });
        },
        filterGoods(searchLine) {
            if(searchLine.length == 0){
                this.filteredGoods = [...this.goods]
                return;
            }
            const regexp = new RegExp(searchLine, 'i');
            this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        },
        isVisibleCart() {
            this.isVisibleCard = !this.isVisibleCard;
        },
        isVisibleWriteTo() {
            this.isVisibleWrite = !this.isVisibleWrite;
        },
    },
    computed: {
        amountCart() {
            let priceCart = {
                amount: 0,
                quantity: 0
            }
            if (this.basketList) {
                this.basketList.forEach(item => {
                    priceCart.amount += item.price * item.quantity;
                    priceCart.quantity += item.quantity;
                });
            };
            return priceCart;
        },
    },
    mounted() {
        this.loadGoods();
        this.loadBasket();
    }
});
