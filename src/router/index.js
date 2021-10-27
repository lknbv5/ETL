// import Simple from '../components/simple.vue';
import DemoIndex from '../components/demoIndex';

import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'demos',
    component: DemoIndex,
    children: [
      // {
      //   path: '',
      //   name: 'simple',
      //   component: Simple
      // }
    ]
  }
]

const router = createRouter({
  routes, // short for `routes: routes`
  history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
