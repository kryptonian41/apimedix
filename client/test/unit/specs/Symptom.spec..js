// import Vue from 'vue'
import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Foo from '../src/Foo.vue'
import Symptom from '@/components/Symptom'

describe('Symptom.vue', () => {
  let wrp
  const routes = [
    {
      path: '/',
      name: 'HelloWorld'
    },
    {
      path: '/disease/:id/:title',
      props: true,
      name: 'disease'
    },
    {
      path: '/docs'
    }
  ]
  const router = new VueRouter({ routes })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    localVue.use(Vuetify)

    wrp = mount(Foo, { localVue: localVue, router })
  })

  it('should render correct contents', () => {
    const Constructor = Vue.extend(Symptom)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent).toEqual(
      'Welcome to Your Vue.js App'
    )
  })
})
