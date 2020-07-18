import Vue from 'vue';

Vue.filter('currency', value => {
  return `R$ ${value.toLocaleString()}`;
});
