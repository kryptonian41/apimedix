import Vue from 'vue'
import Router from 'vue-router'
import Symptom from '@/components/Symptom.vue'
import Disease from '@/components/disease.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Symptom
    },
    {
      path: '/disease/:id',
      component: Disease
    }
  ]
})
