<template>
  <v-layout row wrap>
    <Stock v-for="stock in stocks" :key="stock.id" :stock="stock" />
  </v-layout>
</template>

<script>
import Stock from './Stock';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: { Stock },

  mounted() {
    this.listStocks();
  },

  computed: {
    ...mapGetters({
      stocks: 'getStocks',
    }),
  },

  methods: {
    ...mapActions({
      listStocks: 'listStocks',
    }),
  },
};
</script>

<style></style>
