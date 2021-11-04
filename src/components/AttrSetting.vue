<template>
  <div v-if="this.$route.path === '/AttrSetting'">
    <div style="margin-bottom: 20px">
      <a-select
        v-model:value="selectedProject"
        placeholder="选择一个项目"
        
        style="width: 200px"
        @focus="selectProjectFocus"
        @change="selectProjectChange"
      >
        <a-select-option
          v-for="item in projectlist"
          :key="item.id"
          :value="item.id"
          >{{ item.projectName }}</a-select-option
        >
      </a-select>
      <a-button type="primary" @click="createNewAttr" style="margin-left: 20px">
        <PlusCircleOutlined />新建
      </a-button>
      <a-button style="margin-left: 10px"> 预览总数据 </a-button>
    </div>
    <div>
      <a-table
        :data-source="attritubelist"
        :pagination="pagination"
        :columns="columns"
        :rowKey="
          (record, index) => {
            return index;
          }
        "
      >
        <template #isActive="{ record }">
          <a-checkbox v-model:checked="record.isActive">激活</a-checkbox>
        </template>
        <template #option="{ record }">
          <a-button
            type="link"
            @click="configattr(record)"
            style="padding: 0"
          ></a-button>
          <router-link
            :to="{
              name: 'Config',
            }"
            @click="senditem(record)"
            >配置</router-link
          >
          <a-divider type="vertical"></a-divider>
          <a-button type="link" @click="configattr(record)" style="padding: 0">
            <template #icon><SearchOutlined /></template>预览</a-button
          >
          <a-divider type="vertical"></a-divider>
          <a-button type="link" @click="configattr(record)" style="padding: 0"
            >编辑</a-button
          >
          <a-divider type="vertical"></a-divider>
          <a-popconfirm
            ok-text="删除"
            placement="topRight"
            cancel-text="暂时不"
            @confirm="sureDel(record)"
            width="20px"
          >
            <template #icon>
              <question-circle-outlined style="color: red" />
            </template>
            <template #title>
              <p>
                确定要删除<span style="color: red">{{ record.name }}</span
                >吗？
              </p>
            </template>
            <a-button type="link" danger style="width: 30px; padding: 0"
              >删除</a-button
            >
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
  <Config v-else :attr="editAttr" />
</template>

<script>
import { getProjectlist,getAttributeList } from "../../src/util/Apiservice.js";
import Config from "../components/AttrSetting_config.vue";
import { useStore } from "vuex";
export default {
  name: "AttrSetting",
  data() {
    const store = new useStore();
    return {
      store,
      projectlist: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: (total) => `共 ${total} 条数据`,
        showSizeChanger: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        onShowSizeChange: (current, pageSize) => (this.pageSize = pageSize),
      },
      attritubelist: [],
      columns: [
        {
          title: "数据名称",
          dataIndex: "attributeName",
          key: "attributeName",
        },
        {
          title: "描述",
          dataIndex: "description",
          key: "description",
        },
        {
          title: "更新周期",
          dataIndex: "frequency",
          key: "frequency",
        },
        {
          title: "抽取类型",
          dataIndex: "requestType",
          key: "requestType",
        },
        {
          title: "激活状态",
          dataIndex: "isActive",
          key: "isActive",
          slots: {
            customRender: "isActive",
          },
        },
        {
          title: "操作",
          dataIndex: "option",
          key: "option",
          slots: {
            customRender: "option",
          },
        },
      ],
    };
  },
  computed: {
    selectedProject: {
      get() {
        return this.store.state.selectedProject;
      },
      set(value) {
        this.store.commit("updateselectedProject", value);
      },
    },
    editAttr: {
      get() {
        return this.store.state.editAttr;
      },
      set(value) {
        this.store.commit("updateeditAttr", value);
      },
    },
  },
  components: { Config },
  methods: {
    //页面初始加载时刷新
    refresh() {},
    //选择项目获取焦点时，获取列表项
    selectProjectFocus() {
      getProjectlist().then((res) => {
        this.projectlist = res;
      });
    },
    //选择的项目发生变动事件
    selectProjectChange() {
        //拿着当前项目id更新下方属性列表
    getAttributeList({currentProjectId:this.selectedProject}).then(res=>{
      this.attritubelist=res
    })
    },
    senditem(record) {
      this.editAttr = this.$_.cloneDeep(record);
    },
    createNewAttr(){
        this.editAttr={}
        this.$router.push({name:"NewConfig"})
    },
  },
  created() {
    getProjectlist().then((res) => {
      this.projectlist = res;
    });
    //拿着当前项目id更新下方属性列表
    getAttributeList({currentProjectId:this.selectedProject}).then(res=>{
      this.attritubelist=res
    })
    //#region 
    // if (this.selectedProject == 3) {
    //   this.attritubelist = [
    //     {
    //       name: "测试3",
    //       des: "测试3",
    //       period: "测试3",
    //       sourcetype: "测试3",
    //       isActive: true,
    //     },
    //     {
    //       name: "测试3",
    //       des: "测试3",
    //       period: "测试3",
    //       sourcetype: "测试3",
    //       isActive: false,
    //     },
    //   ];
    // } else if (this.selectedProject == 4) {
    //   this.attritubelist = [
    //     {
    //       name: "测试4",
    //       des: "测试4",
    //       period: "测试4",
    //       sourcetype: "测试4",
    //       isActive: true,
    //     },
    //     {
    //       name: "测试4",
    //       des: "测试4",
    //       period: "测试4",
    //       sourcetype: "测试4",
    //       isActive: false,
    //     },
    //   ];
    // } else if (this.selectedProject == 5) {
    //   this.attritubelist = [
    //     {
    //       name: "测试5",
    //       des: "测试5",
    //       period: "测试5",
    //       sourcetype: "测试5",
    //       isActive: true,
    //     },
    //     {
    //       name: "测试5",
    //       des: "测试5",
    //       period: "测试5",
    //       sourcetype: "测试5",
    //       isActive: false,
    //     },
    //   ];
    // }
    //#endregion
  }
};
</script>

<style>
</style>