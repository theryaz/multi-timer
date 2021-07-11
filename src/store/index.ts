import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {RootState} from './RootState';
import userStore from './user.store';

export default new Vuex.Store<RootState>({
  modules:{
    userState: userStore,
  }
})
