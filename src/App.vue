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
     /* ::-webkit-scrollbar {
     width: 0 !important;
   } */
   ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 13px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 30px;
  background-color: #babac0;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }

</style>
