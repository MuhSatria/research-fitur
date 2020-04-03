import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import Croppa from 'vue-croppa'

import Vuetify from 'vuetify'
import('vuetify/dist/vuetify.min.css')
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueRouter)
// Vue.component('croppa', Croppa.component)
Vue.use(Croppa)
Vue.use(Vuetify)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD9GzoswIWyEoCE84iLomPWdqW6_bBQ3aA',
    libraries: 'places'
  }
})

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
