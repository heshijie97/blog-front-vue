import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'
import router from './router/index.js';
import store from './store/index'
import "./axios"
import mavonEditor from "mavon-editor"
import "mavon-editor/dist/css/index.css"
import "./permission.js"

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.use(mavonEditor);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
