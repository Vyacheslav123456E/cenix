import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import vuetify from './plugins/vuetify'
import socket from './plugins/socket'
import store from "@/store";
import VueSocketIO from 'vue-socket.io'
import '@/assets/styles.scss';

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.use(new VueSocketIO(socket(store)))

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App),
  el: '#app'
})