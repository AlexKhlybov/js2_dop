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
                    <form 
                        class="row  g-3" 
                        name="writeForm" 
                        method="post" 
                        id="writeForm"
                        @submit="checkForm">
                        <div class="col-12">
                            <label for="inputName" class="form-label">Name</label>
                            <input v-model="name" v-bind:class="{'is-invalid' : error.name}" type="text" class="form-control" id="inputName">
                            <div class="invalid-feedback">Имя не может быть пустым и не может содержать цифры!</div>
                        </div>
                        <div class="col-12">
                            <label for="inputPhone" class="form-label">Phone</label>
                            <input v-model="phone" v-bind:class="{'is-invalid' : error.phone}" type="text" class="form-control" id="inputPhone">
                            <div class="invalid-feedback">Телефон должен быть вида: +7(999)000-0000</div>
                        </div>
                        <div class="col-12">
                            <label for="inputEmail" class="form-label">Email</label>
                            <input v-model="email" v-bind:class="{'is-invalid' : error.email}" type="text" class="form-control" id="inputEmail">
                            <div class="invalid-feedback">Введите корректный Email. Пример: example@mail.com</div>
                        </div>
                        <div class="col-12  mb-3">
                            <label for="textarea" class="form-label">Text</label>
                            <textarea v-model="text" v-bind:class="{'is-invalid' : error.text}" class="form-control" id="textarea" rows="3"></textarea>
                            <div class="invalid-feedback">Поле не может быть пустым!</div>
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
    data() {
        return {
            name: "",
            phone: "",
            email: "",
            text: "",
            error: {
                name: false,
                phone: false,
                email: false,
                text: false
            },
            patterns: {
                name: /[a-z,A-Z]+/,
                phone: /\+\d{1}\(\d{3}\)\d{3}\-\d{4}/,
                email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
                text: /.+/,
            },
        }
    },
    props: {
        visible: {
            type: Boolean,
        }
    },
    methods: {
        onClick() {this.$emit('close')},
        checkForm(e) {
            for (let key in this.error) {
                this.error[key] = false;
            }
            if (!this.patterns.name.test(this.name)) {
                this.error.name = true;
            };
            if (!this.patterns.phone.test(this.phone)) {
                this.error.phone = true;
            };
            if (!this.patterns.email.test(this.email)) {
                this.error.email = true;
            };
            if (!this.patterns.text.test(this.text)) {
                this.error.text = true;
            };

            for (let key in this.error) {
                if (this.error[key]) {
                    e.preventDefault();
                    return;
                }
            }

            e.preventDefault();
            alert('Форма успешно отправлена!');
        },
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