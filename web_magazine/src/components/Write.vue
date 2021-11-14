<template>
  <div class="basket-modal" v-if="visible">
    <div class="container">
      <div class="basket-modal__inner" id="basketModal">
        <div class="basket-modal__content">
          <button class="button__close" @click="onClick" type="button">
            <img class="close" src="img/close.svg" alt="..." />
          </button>
          <h2 class="basket__title">Форма обратной связи:</h2>
          <hr class="separator" />
          <form
            class="row g-3"
            name="writeForm"
            method="post"
            id="writeForm"
            @submit="checkForm"
          >
            <div class="col-12">
              <label for="inputName" class="form-label">Name</label>
              <input
                v-model="name"
                v-bind:class="{ 'is-invalid': error.name }"
                type="text"
                class="form-control"
                id="inputName"
              />
              <div class="invalid-feedback">
                Имя не может быть пустым и не может содержать цифры!
              </div>
            </div>
            <div class="col-12">
              <label for="inputPhone" class="form-label">Phone</label>
              <input
                v-model="phone"
                v-bind:class="{ 'is-invalid': error.phone }"
                type="text"
                class="form-control"
                id="inputPhone"
              />
              <div class="invalid-feedback">
                Телефон должен быть вида: +7(999)000-0000
              </div>
            </div>
            <div class="col-12">
              <label for="inputEmail" class="form-label">Email</label>
              <input
                v-model="email"
                v-bind:class="{ 'is-invalid': error.email }"
                type="text"
                class="form-control"
                id="inputEmail"
              />
              <div class="invalid-feedback">
                Введите корректный Email. Пример: example@mail.com
              </div>
            </div>
            <div class="col-12 mb-3">
              <label for="textarea" class="form-label">Text</label>
              <textarea
                v-model="text"
                v-bind:class="{ 'is-invalid': error.text }"
                class="form-control"
                id="textarea"
                rows="3"
              ></textarea>
              <div class="invalid-feedback">Поле не может быть пустым!</div>
            </div>
            <div class="col-12">
              <button class="btn btn-primary" type="submit" id="btnSubmit">
                Отправить
              </button>
            </div>
          </form>
        </div>
        <hr class="separator" />
      </div>
      <!-- /.basket-modal__inner -->
    </div>
    <!-- /.container -->
  </div>
  <!-- /.basket-modal -->
</template>

<script>
export default {
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      text: '',
      error: {
        name: false,
        phone: false,
        email: false,
        text: false,
      },
      patterns: {
        name: /[a-z,A-Z]+/,
        phone: /\+\d{1}\(\d{3}\)\d{3}-\d{4}/,
        /* eslint-disable-next-line */
        email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
        text: /.+/,
      },
    };
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  methods: {
    onClick() {
      this.$emit('close');
    },
    checkForm(e) {
      /* eslint-disable-next-line */
      for (const key of Object.values(this.error)) {
        this.error[key] = false;
      }
      if (!this.patterns.name.test(this.name)) {
        this.error.name = true;
      }
      if (!this.patterns.phone.test(this.phone)) {
        this.error.phone = true;
      }
      if (!this.patterns.email.test(this.email)) {
        this.error.email = true;
      }
      if (!this.patterns.text.test(this.text)) {
        this.error.text = true;
      }

      /* eslint-disable-next-line */
      for (const key of Object.values(this.error)) {
        if (this.error[key]) {
          e.preventDefault();
          return;
        }
      }

      e.preventDefault();
      console.log('Форма успешно отправлена!');
    },
  },
};
</script>
