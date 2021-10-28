<template>
  <a-layout class="max" id="components-layout-demo-custom-trigger"> 
    <a-layout-sider v-model:collapsed="collapsed"  collapsible class="site-layout">
      <div class="logo" >
          <!-- <AntDesignOutlined /> -->
          <img src="../assets/logo.png" width="35" style="margin-left:10px"/>
          <span v-if="!collapsed" style="font-size:20px; margin-left:15px;color:white" >港通云中枢</span>
      </div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <DatabaseOutlined />
          <span>项目设置</span>
        </a-menu-item>
        <a-menu-item key="2">
         <ControlOutlined />
          <span>属性源配置</span>
        </a-menu-item>
        <a-menu-item key="3">
          <NodeIndexOutlined />
          <span>自定义数据源配置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout >
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff',height:'900px'}"
      >
            <DemoIndex />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import {
  DatabaseOutlined,
  ControlOutlined,
  NodeIndexOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';

import DemoIndex from '../components/demoIndex.vue';

export default defineComponent({
  components: {
    DatabaseOutlined,
    ControlOutlined,
    NodeIndexOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    DemoIndex
  },
    name:"Name",
  setup() {
    return {
      selectedKeys: ref(['1']),
      collapsed: ref(false),
    };
  },
});
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 42px;
  background:transparent;
  color:rgb(4, 138, 247) ;
  align-content: center;
  margin: 16px;
  font-size: 32px;
  line-height: 32px;
}

/* #components-layout-demo-custom-trigger .site-layout {
  
  height:100% ;
} */
</style>