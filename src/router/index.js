import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '../views/TableView.vue'
import IpInfo from '../views/IpInfo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/results',
      name: 'results',
      component: TableView
    },
    {
      path: '/info/:ip',
      name: 'info',
      component: IpInfo,
      props: route => ({ ip: route.params.ip }),
    }
  ]
})

export default router
