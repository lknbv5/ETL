<template>
  <a-layout
    style="min-height: 100vh"
    id="components-layout-demo-custom-trigger"
  >
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo">
        <img src="../assets/logo.png" width="35" style="margin-left: 10px" />
        <span
          v-if="!collapsed"
          style="font-size: 20px; margin-left: 15px; color: white"
          >港通云中枢</span
        >
      </div>
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="[$route.path]"
        :default-selected-keys="[this.$route.path.split('/')[2]]"
        :default-open-keys="[this.$route.path.split('/')[1]]"
      >
        <a-menu-item key="/ProjectSetting">
          <DatabaseOutlined style="margin-right:8px"/>
          <!-- <router-link to="/ProjectSetting">项目配置</router-link> -->
          <span><router-link to="/ProjectSetting"></router-link>项目配置</span>
        </a-menu-item>
        <a-menu-item key="/AttrSetting">
          <ControlOutlined style="margin-right:8px"/>
          <span><router-link to="/AttrSetting"></router-link>属性源配置</span>
        </a-menu-item>
        <a-menu-item key="/DemoIndex">
          <NodeIndexOutlined style="margin-right:8px"/>
          <span><router-link to="/DemoIndex"></router-link>自定义数据源配置</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <div style="margin-left:20px;margin-top:0px;">
          <span style="color:black;" >你的位置:</span>
          <a-breadcrumb separator="/" style="display:inline-block">
          <!-- <span style="color:black">你的位置:</span> -->
          <a-breadcrumb-item
            v-for="(item, index) of $route.matched"
            :key="index"
          >
            <router-link :to="item.path" class="routlink" style="font-size: 14px ;">
              {{item.meta.title}}
            </router-link>
          </a-breadcrumb-item>
        </a-breadcrumb>
        </div>
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '50px 20px 0px 20px',
          padding: '24px',
          background: '#fff',
        }"
      >
        <router-view />
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <h5 style="height: 5px; color: gray">
          Copyright &copy; 2021 山东港通技术中心出品
        </h5>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script >
import {
  ControlOutlined,
  DatabaseOutlined,
  NodeIndexOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";

//import DemoIndex from '../components/demoIndex.vue';

export default defineComponent({
  components: {
    ControlOutlined,
    DatabaseOutlined,
    NodeIndexOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    //DemoIndex
  },
  name: "Menu",
  setup() {
    return {
      collapsed: ref(false),
    };
  },
  created() {
   
  },
  data() {
    return {
      
    };
  },
  methods: {
    
    
  },
  watch: {
    
  },
});
</script>
<style scope>
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
  background: transparent;
  color: rgb(4, 138, 247);
  align-content: center;
  margin: 16px;
  font-size: 32px;
  line-height: 32px;
}
</style>