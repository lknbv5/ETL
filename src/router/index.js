// import Simple from '../components/simple.vue';
//import DemoIndex from '../components/demoIndex';
import Menu from '../components/menu.vue';
import {createRouter,createWebHashHistory} from 'vue-router'

import ProjectSetting from '../components/ProjectSetting.vue';
import AttrSetting from '../components/AttrSetting.vue';
import DemoIndex from '../components/demoIndex.vue';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Menu,
    children: [
      {
        path: '/',
				redirect: { name: 'ProjectSetting' }
      },
      {
        path: '/ProjectSetting',
        name: 'ProjectSetting',
        meta:{title:'项目配置'},
        component: ProjectSetting
      },
      {
        path:'/AttrSetting',
        name:'AttrSetting',
        meta:{title:'属性源配置'},
        component:AttrSetting
      },
      {
        path:'/DemoIndex',
        name:'DemoIndex',
        meta:{title:'自定义配置'},
        component:DemoIndex
      }
    ]
  }
]

const router = createRouter({
  routes, // short for `routes: routes`
  history: createWebHashHistory(process.env.BASE_URL),
});

export default router;
