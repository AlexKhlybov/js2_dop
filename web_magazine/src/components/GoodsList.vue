<template>
  <div class="goods-list row mt-5">
    <GoodCart
      v-for="good of list"
      v-bind:key="good.id_product"
      v-bind:title="good.product_name"
      v-bind:price="good.price"
      v-bind:prod_id="good.id_product"
    ></GoodCart>
  </div>
</template>

<script>
import GoodCart from './GoodCart.vue';

export default {
  components: {
    GoodCart,
  },
  computed: {
    list() {
      return this.$store.getters.goods;
    },
  },
};
</script>
