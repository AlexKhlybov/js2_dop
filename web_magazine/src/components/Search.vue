<template>
    <div class="d-flex">
        <input class="form-control me-2" v-model="searchLine" placeholder="Поиск" aria-label="Search">
        <button class="btn btn-outline-success" v-on:click="onclick">Поиск</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchLine: "",
        }
    },
    methods: {
        onclick() {
            this.$store.dispatch('onSearch', this.searchLine)
        }
    },
}
</script>