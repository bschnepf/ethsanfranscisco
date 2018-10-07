// zenbu, 全部, bts: 2018 part of Dapp for ConsenSys Academy and ETHSF

import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import NavbarTemplate from './components/navbar-template.vue'
import CardTemplate from './components/card-template.vue'

import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import titleMixin from './util/title'
import * as filters from './util/filters'

Vue.use(VueResource)

Vue.config.productionTip = true

Vue.component('my-navbar', NavbarTemplate)
Vue.component('my-card', CardTemplate)
// mixin for handling title
Vue.mixin(titleMixin)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
  // create store and router instances
  const store = createStore()
  const router = createRouter()

  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    // bs: el: '#app',
    router,
    store,
    // bs: template: '<App/>',
    // bs: components: { App },
    render: h => h(App)
  })

  // expose the app, the router and the store.
  // note we are not mounting the app here, since bootstrapping will be
  // different depending on whether we are in a browser or on the server.
  return { app, router, store }
}
