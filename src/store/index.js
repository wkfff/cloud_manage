import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import worksheet from './modules/worksheet'
import built from './modules/built'
import getters from './getters'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    worksheet,
    built
  },
  getters,
  // plugins: [createPersistedState({
  //   key: 'cloud.vuex',
  //   storage: window.localStorage,
  //   reducer(val) {
  //     return {
  //       // 只储存state中的worksheet
  //       worksheet: val.worksheet
  //     }
  //   }
  // })]
})

// 源码中规定导出的 store 可对象也可方法
export default store
