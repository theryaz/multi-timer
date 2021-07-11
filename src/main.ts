import firebase from 'firebase';
import './services/firebase';
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from '@/store'
import { timerService } from '@/services'

import vuetify from './plugins/vuetify';

import { VNumber } from "@maxflex/v-number";
Vue.component('v-number', VNumber);
import AppBar from  '@/components/nav/AppBar.vue';
Vue.component('AppBar', AppBar);
import UserMenu from  '@/components/UserMenu.vue';
Vue.component('UserMenu', UserMenu);

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.commit('setFirebaseUser', user);
    timerService.start();
  }else if(!store.state.userState.firebaseAuthInitialized){
    store.commit('firebaseAuthInitialized');
  }
});


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
