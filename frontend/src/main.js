import './assets/swal-custom-style.css';
import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store/store';

import './plugins/vuetify';
import './plugins/sweetAlert';
import './plugins/axios';
import './filters';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
