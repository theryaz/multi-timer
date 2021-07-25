import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)


import {RootState} from './RootState';
import userStore from './user.store';

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.localStorage,
  // Persist only timer states  in local storage
  reducer: (state) => {
    return {
      userState: {
        rootTimers: state.userState.rootTimers
      }
    };
  }
})

export default new Vuex.Store<RootState>({
  modules:{
    userState: userStore,
  },
  plugins: [vuexLocal.plugin]
})
