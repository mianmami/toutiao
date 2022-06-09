import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const actions = {
  jia(context, value){

  }
}

const mutations = {
  JIA(state, value){
    console.log(state);
  }
}

const state = {
  sum: 0
}

export default new Vuex.Store({
  actions,
  mutations,
  state,
})