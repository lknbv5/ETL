<template>
  <div>
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="dataList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a>编辑</a>
            <a>删除</a>
          </template>
          <a-list-item-meta :description="item.projectApiAdd">
            <template #title>
              <a href="https://www.antdv.com/">{{ item.projectName }}</a>
            </template>
            <template #avatar>
              <img class="avatar" :src="url(item.projectNo)">
            </template>
          </a-list-item-meta>
          <a-button type="primary" @click="showallData(item.id)"
            >预览总数据</a-button
          >
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import Identicon from 'identicon.js'
export default {
  name: "ProjectSetting",
  data() {
    const dataList =[
  {
    "id": 3,
    "projectNo": "075a8b30-bfc0-43eb-ba5b-5d4c4b224463",
    "projectApiAdd": "Test",
    "projectName": "测试"
  },
  {
    "id": 4,
    "projectNo": "74df013b-67be-44d7-8c2d-312b160bdd8b",
    "projectApiAdd": "Test2",
    "projectName": "测试2"
  },
  {
    "id": 5,
    "projectNo": "e41d5e75-78bf-444d-bc17-d1915dd873ff",
    "projectApiAdd": "test3",
    "projectName": "测试项目"
  }
];
    return {
      dataList,
    };
  },
  methods: {
    showallData() {

    },
  },
  computed: {
    url(){
      return function(a){
        return "data:image/png;base64," + new Identicon(md5(a), 400).toString();
      }
      
    },
  },
  components: {
    
  },
};
</script>

<style scope>
.demo-loadmore-list {
  min-height: 500px;
}
.avatar{
  width: 40px;
  height: 40px;
}
</style>