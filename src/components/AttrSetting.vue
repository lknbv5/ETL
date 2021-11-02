<template>
  <div v-if="this.$route.path === '/AttrSetting'">
    <div style="margin-bottom: 20px">
      <a-select
        v-model:value="selectedProjectid"
        placeholder="选择一个项目"
        :pagination="pagination"
        style="width: 200px"
        @focus="selectProjectFocus"
        @blur="handleBlur"
        @change="selectProjectChange"
      >
        <a-select-option
          v-for="item in projectlist"
          :key="item.id"
          :value="item.id"
          >{{ item.projectName }}</a-select-option
        >
      </a-select>
      <a-button type="primary" @click="refresh" style="margin-left: 20px">
        <PlusCircleOutlined />新建
      </a-button>
      <a-button @click="createNewProject" style="margin-left: 10px">
        预览总数据
      </a-button>
    </div>
    <div>
      <a-table :data-source="attritubelist" :columns="columns">
        <template #isActive="{ record }">
          <a-checkbox v-model:checked="record.isActive">激活</a-checkbox>
        </template>
        <template #option="{ record }">
          <a-button type="link" @click="configattr(record)" style="padding: 0"
            ></a-button
          >
          <router-link :to="{path:'/AttrSetting/Config'}">配置</router-link>
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
  <router-view v-else/>
</template>

<script>
import { getProjectlist } from "../../src/util/Apiservice.js";
export default {
  data() {
    return {
      projectlist: [],
      selectedProjectid: null,
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
          dataIndex: "name",
          key: "name",
        },
        {
          title: "描述",
          dataIndex: "des",
          key: "des",
        },
        {
          title: "更新周期",
          dataIndex: "period",
          key: "period",
        },
        {
          title: "抽取类型",
          dataIndex: "sourcetype",
          key: "sourcetype",
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
  components: {},
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
      if (this.selectedProjectid == 3) {
        this.attritubelist = [
          {
            name: "测试3",
            des: "测试3",
            period: "测试3",
            sourcetype: "测试3",
            isActive: true,
          },
          {
            name: "测试3",
            des: "测试3",
            period: "测试3",
            sourcetype: "测试3",
            isActive: false,
          },
        ];
      } else if (this.selectedProjectid == 4) {
        this.attritubelist = [
          {
            name: "测试4",
            des: "测试4",
            period: "测试4",
            sourcetype: "测试4",
            isActive: true,
          },
          {
            name: "测试4",
            des: "测试4",
            period: "测试4",
            sourcetype: "测试4",
            isActive: false,
          },
        ];
      } else if (this.selectedProjectid == 5) {
        this.attritubelist = [
          {
            name: "测试5",
            des: "测试5",
            period: "测试5",
            sourcetype: "测试5",
            isActive: true,
          },
          {
            name: "测试5",
            des: "测试5",
            period: "测试5",
            sourcetype: "测试5",
            isActive: false,
          },
        ];
      }
    },
  },
  created() {},
};
</script>

<style>
</style>