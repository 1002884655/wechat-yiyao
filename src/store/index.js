import Vue from 'vue'
import Vuex from 'vuex'
import { storeAuthPlugin } from '@/util/auth-plugin'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [storeAuthPlugin],
  state: {
  },
  mutations: {
  }
})

export const modules = {
  user: () => require('./user/index').default,
  index: () => require('./index/index').default
}

Object.keys(modules).forEach(modKey => {
  const modNS = modKey.split('/')
  const getMod = modules[modKey]
  store.registerModule(...modNS, getMod())
})

export default store
