import firebase from 'firebase';
import './services/firebase';
import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from '@/store'
import { timerService } from '@/services'

import vuetify from './plugins/vuetify';

import DatetimePicker from 'vuetify-datetime-picker'
Vue.use(DatetimePicker);

import AppBar from  '@/components/nav/AppBar.vue';
Vue.component('AppBar', AppBar);
import NavigationDrawer from  '@/components/nav/NavigationDrawer.vue';
Vue.component('NavigationDrawer', NavigationDrawer);
import UserMenu from  '@/components/UserMenu.vue';
Vue.component('UserMenu', UserMenu);
import SettingsMenu from  '@/components/SettingsMenu.vue';
Vue.component('SettingsMenu', SettingsMenu);
import Timer from  '@/components/Timer.vue';
Vue.component('Timer', Timer);
import EditTimerDialog from  '@/components/EditTimerDialog.vue';
Vue.component('EditTimerDialog', EditTimerDialog);

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
