<template>
  <div class="basket-modal" v-if="visible" id="goodsModal">
    <div class="container">
      <div class="basket-modal__inner" id="basketModal">
        <div class="basket-modal__content">
          <button class="button__close" @click="onClick" type="button">
            <img class="close" src="img/close.svg" alt="..." />
          </button>
          <h2 class="basket__title">Корзина:</h2>
          <hr class="separator" />
          <template v-if="!basket || !basket.length">
            <ul class="basket__list">
              <li class="goods__item">Нет данных</li>
            </ul>
            <hr class="separator" />
          </template>
          <template v-else>
            <ul class="basket__list">
              <li
                class="goods__item"
                v-for="item of basket"
                v-bind:key="item.id_product"
              >
                <div class="goods__left">
                  <h3 class="goods__title">{{ item.product_name }}</h3>
                </div>
                <div class="goods__right">
                  <p class="goods__number">{{ item.quantity }}</p>
                </div>
              </li>
            </ul>
            <hr class="separator" />
            <div class="total">
              <p class="total__text">Итого:</p>
              <div class="total__num">{{ amount.amount }} руб.</div>
            </div>
          </template>
        </div>
        <!-- ./basket-modal__content -->
      </div>
      <!-- ./basket-modal__inner -->
    </div>
    <!-- ./container -->
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
    },
    amount: {
      type: Object,
    },
  },
  computed: {
    basket() {
      return this.$store.getters.basketList;
    },
  },
  methods: {
    onClick() {
      this.$emit('close');
    },
  },
};
</script>
