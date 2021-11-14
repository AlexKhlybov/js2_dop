<template>
  <div class="card col col-md-6 col-sm-12 m-3" style="width: 18rem">
    <img src="img/6.jpg" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </p>
      <p>{{ price }} р.</p>
      <div class="d-flex">
        <button
          @click="addToCart"
          class="btn btn-success w-100 btn-sm mx-1 btn--plus"
        >
          Добавить
        </button>
        <button
          @click="removeToCart"
          class="btn btn-danger w-100 btn-sm mx-1 btn--minus"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://127.0.0.1:3000/';

export default {
  props: {
    title: String,
    price: Number,
    prod_id: Number,
  },
  methods: {
    addToCart() {
      fetch(`${API_URL}addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify({
          id: this.prod_id,
          product_name: this.title,
          price: this.price,
        }),
      });
    },
    removeToCart() {
      fetch(`${API_URL}removeToCart`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/JSON',
        },
        body: JSON.stringify({ id: this.prod_id }),
      });
    },
  },
};
</script>
