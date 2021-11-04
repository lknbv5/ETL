// import Simple from '../components/simple.vue';
//import DemoIndex from '../components/demoIndex';
import Menu from '../components/menu.vue';
import {createRouter,createWebHashHistory} from 'vue-router'

import ProjectSetting from '../components/ProjectSetting.vue';
import AttrSetting from '../components/AttrSetting.vue';
import DemoIndex from '../components/demoIndex.vue';
import Config from '../components/AttrSetting_config.vue'
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
        path: 'ProjectSetting',
        name: 'ProjectSetting',
        meta:{title:'项目配置'},
        component: ProjectSetting
      },
      {
        path:'AttrSetting',
        name:'AttrSetting',
        meta:{title:'属性配置'},
        component:AttrSetting,
        children:[
          {
            path:"Config",
            name:"Config",
            meta:{title:'编辑数据源配置'},
            // props({query}){
            //   return {attr:query.attr}
            // },
            component:Config
          },
          {
            path:"NewConfig",
            name:"NewConfig",
            meta:{title:'新建数据源配置'},
            // props({query}){
            //   return {attr:query.attr}
            // },
            component:Config
          },
        ]
      },
      {
        path:'DemoIndex',
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
