<template>
  <div class="page">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header__item">
          <div class="header__left">
            <div class="header__logo">
              <a class="header__link" href="#">ProMag</a>
            </div>
            <nav class="nav">
              <a
                class="nav-link link-dark"
                @click="isVisibleWriteTo"
                id="writeTo"
                href="#"
                >Напишите нам</a
              >
            </nav>
          </div>
          <div class="header__cart">
            <Search v-on:search="filterGoods"></Search>
            <button
              class="header__cart-button"
              @click="isVisibleCart"
              id="headerButton"
              type="button"
            >
              <img class="header__img" src="img/cart_img.svg" alt="Корзина" />
            </button>
            <div class="counter" id="headerCounter">
              <p class="counter__text" id="cartCounter">
                {{ amountCart.quantity }}
              </p>
            </div>
            <div class="price">
              <p class="price__text" id="headerPrice">
                {{ amountCart.amount }} руб.
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- ./container -->
    </header>

    <main>
      <div class="container">
        <div class="goods-list row mt-5">
          <GoodsList></GoodsList>
        </div>
      </div>
    </main>

    <!-- Basket Modal -->
    <Cart
      v-bind:visible="isVisibleCard"
      v-bind:amount="amountCart"
      v-on:close="isVisibleCart"
    ></Cart>

    <!-- WriteTo Modal -->
    <Write
      v-bind:visible="isVisibleWrite"
      v-on:close="isVisibleWriteTo"
    ></Write>
  </div>
</template>

<script>
import Search from '../components/Search.vue';
import GoodsList from '../components/GoodsList.vue';
import Cart from '../components/Cart.vue';
import Write from '../components/Write.vue';

export default {
  components: {
    Search,
    GoodsList,
    Cart,
    Write,
  },
  data() {
    return {
      searchLine: '',
      isVisibleWrite: false,
      isVisibleCard: false,
    };
  },
  methods: {
    isVisibleCart() {
      this.loadBasket();
      this.isVisibleCard = !this.isVisibleCard;
    },
    isVisibleWriteTo() {
      this.isVisibleWrite = !this.isVisibleWrite;
    },
  },
  computed: {
    amountCart() {
      const priceCart = {
        amount: 0,
        quantity: 0,
      };
      if (this.basketList) {
        this.basketList.forEach((item) => {
          priceCart.amount += item.price * item.quantity;
          priceCart.quantity += item.quantity;
        });
      }
      return priceCart;
    },
  },
  mounted() {
    this.$store.dispatch('loadGoods');
    this.$store.dispatch('loadCart');
  },
};
</script>
