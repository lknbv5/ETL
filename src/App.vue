<template>
  <a-config-provider :locale="locale">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import {useStore} from 'vuex'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/dist/locale/zh-cn';
moment.locale("zh-cn");
export default {
  name:"app",
  data(){
    const store = new useStore();
    return{
      store,
      locale:zhCN
    }
  },
  created() {
            window.addEventListener('unload', this.saveState)
        },
        methods: {
            saveState() {
                sessionStorage.setItem('state', JSON.stringify(this.store.state))
            }
        }
}
</script>
<style >
     ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
</style>
