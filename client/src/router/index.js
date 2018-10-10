import Vue from 'vue'
import Router from 'vue-router'
import Symptom from '@/components/Symptom.vue'
import Disease from '@/components/disease.vue'
import DocMap from '@/components/doctors.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Symptom
    },
    {
      path: '/disease/:data',
      component: Disease,
      props: true,
      name: 'disease'
    },
    {
      path: '/docs',
      component: DocMap
    }
  ]
})
