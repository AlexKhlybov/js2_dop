const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/"

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: "",

        basketList: [],

        isVisibleCard: false,
        isVisibleWrite: false,

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
                    this.basketList = data;
                });
        },
        filterGoods() {
            const regexp = new RegExp(this.searchLine, 'i');
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
            if (this.basketList.contents) {
                this.basketList.contents.forEach(item => {
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
