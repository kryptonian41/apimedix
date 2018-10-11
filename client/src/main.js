import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#2196F3',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

// event bus for symtom store and other methods
export const symptomStore = new Vue({
  data() {
    return { symptoms: [], result: [], selectedSym: [] }
  },
  computed: {
    noSymptoms() {
      return this.symptoms.length > 0 ? false : true
    },
    noResult() {
      return this.result.length > 0 ? false : true
    }
  },
  methods: {
    set(data) {
      this.symptoms = data
    },
    setResult(data) {
      this.result = data
    },
    setSelSym(data) {
      this.selectedSym = data
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
