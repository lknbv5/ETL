<template>
  <div v-if="this.$route.path === '/AttrSetting'">
  <a-drawer
      title="预览数据"
      placement="right"
      :closable="true"
      v-model:visible="drawer_visible"
      width="30vw"
    >
      <json-viewer
        :value="previewData"
        :copyable="{ copyText: '复制', copiedText: '已复制!' }"
        sort
        expanded
        :expand-depth='3'
        timeformat
      />
    </a-drawer>
    <div style="margin-bottom: 20px">
      <a-select
        v-model:value="selectedProjectId"
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
      <a-button style="margin-left: 10px" @click="showAllData"> 预览总数据 </a-button>
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
        <template #frequency="{text:frequency}">
          <a-tag :color="frequencyColor(frequency)">{{frequencyType(frequency)}}</a-tag>
        </template>
        <template #extractType='{text:extractType}'>
          <a-tag :color="extractTypeColor(extractType)">{{showextractType(extractType)}}</a-tag>
        </template>
        <template #isActive="{ record }">
          <a-checkbox v-model:checked="record.isActive" @change="ActiveChange(record)" :disabled="isCanActive(record.mongoId)">激活</a-checkbox>
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
          <a-button type="link" @click="Preview(record)" style="padding: 0">
            <template #icon><SearchOutlined /></template>预览</a-button
          >
          <!-- <a-divider type="vertical"></a-divider>
          <a-button type="link" @click="configattr(record)" style="padding: 0"
            >编辑</a-button
          > -->
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
import { getProjectlist,getAttributeList,setIsActive,getProjectAllAttr,getAttribute,deleteAttr } from "../../src/util/Apiservice.js";
import Config from "../components/AttrSetting_config.vue";
import { useStore } from "vuex";
export default {
  name: "AttrSetting",
  data() {
    const store = new useStore();
    return {
      store,
      drawer_visible:false,
      previewData:null,
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
          slots: {
            customRender: "frequency",
          },
        },
        {
          title: "抽取类型",
          dataIndex: "extractType",
          key: "extractType",
          slots: {
            customRender: "extractType",
          },
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
    isCanActive(){
      return(mongid)=>{
          if(mongid===null){
            return true;
          }else{
            return false;
          }
      }
    },
    frequencyType(){
      return (frequency)=>{
        switch (frequency) {
          case 0:
            return "分更新";
          case 1:
            return "时更新";
          case 2:
            return "天更新";
          case 3:
            return "周更新";
          case 4:
            return "月更新";
          case 5:
            return "年更新";
          default:
           return "未配置";
        }   
        //return a;
      }
    },
    frequencyColor(){
        return (frequency)=>{
        switch (frequency) {
          case 0:
            return "cyan";
          case 1:
            return "green";
          case 2:
            return "orange";
          case 3:
            return "pink";
          case 4:
            return "blue";
          case 5:
            return "purple";
          default:
           return "lightgray";
        }   
        //return a;
      }
    },
    showextractType(){
        return (extractType)=>{
        switch (extractType) {
          case 0:
            return "HttpApi";
          case 1:
            return "Operation";
          default:
           return "未配置";
        }   
      }
    },
    extractTypeColor(){
         return (extractType)=>{
        switch (extractType) {
          case 0:
            return "#1890ff";
          case 1:
            return "#0dbc79";
          default:
           return "未配置";
        }   
      }
    },
    selectedProjectId: {
      get() {
        return this.store.state.selectedProject.id;
      },
      set(value) {
          let cp=null;

          this.projectlist.find((item)=>{
              if (item.id==value) {
                  cp=item;
              }
          })
          if (cp!=null) {
            this.store.commit("updateselectedProject", cp);
          }
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
    //设置激活状态
    ActiveChange(record){
        if(record.isActive===true){
            //设置为激活状态
            setIsActive(record).then((res)=>{
                if(res==true){
                  this.$antdmessage.success("已激活,可通过接口访问数据了!")
                }else{
                  this.$antdmessage.error("X 激活失败,请稍后重试，若依旧不行请联系管理员!")
                }
            })
        }else{
            //设置为不激活状态
            setIsActive(record).then((res)=>{
                if(res==true){
                  this.$antdmessage.warning("已取消激活,数据访问不到了!")
                }else{
                  this.$antdmessage.error("X 取消失败,请稍后重试，若依旧不行请联系管理员!")
                }
            })
        }
    },
    //选择项目获取焦点时，获取列表项
    selectProjectFocus() {
      getProjectlist().then((res) => {
        this.projectlist = res;
      });
    },
    //选择的项目发生变动事件
    selectProjectChange() {
        //拿着当前项目id更新下方属性列表
    getAttributeList({currentProjectId:this.selectedProjectId}).then(res=>{
      this.attritubelist=res
    })
    },
    //预览全部数据
    showAllData(){
      this.drawer_visible=true;
      getProjectAllAttr(this.store.state.selectedProject.projectApiAdd).then((res) => {
        this.previewData = res;
      });
          
    },
    //预览单条属性数据
    Preview(record){
        this.drawer_visible=true;
        getAttribute({projectAddr:this.store.state.selectedProject.projectApiAdd,attributeAddr:record.attributeName}).then(res=>{
            this.previewData=res;
        })
    },
    //配置属性
    senditem(record) {
      this.editAttr = this.$_.cloneDeep(record);
      if(this.editAttr.operationSchema===null){
        this.editAttr.operationSchema={
          type: "object",
          title: "示例",
          properties: {
            id: {
              title: "数字示例",
              type: "number",
            },
            name: {
              title: "文本实例",
              type: "string",
            },
            list: {
              type: "array",
              title: "集合示例",
              items: {
                title: "单项",
                type: "string",
              },
            },
          },
        };
        this.editAttr.operationData={};
      }
    },
    //删除属性
    sureDel(record){
        deleteAttr({attrId:record.id,mongoid:record.mongoId}).then(res=>{
          if (res==true) {
             this.$antdmessage.success("属性删除成功!")
          }else{
              this.$antdmessage.error("属性删除失败，请重试，仍不好使请联系管理员!")
          }
        });
        getAttributeList({currentProjectId:this.selectedProjectId}).then(res=>{
      this.attritubelist=res
    })
    },
    //创建新属性
    createNewAttr(){
        this.editAttr={
          requestType:null,
          extractType:1,
          operationSchema: {
          type: "object",
          title: "示例",
          properties: {
            id: {
              title: "数字示例",
              type: "number",
            },
            name: {
              title: "文本实例",
              type: "string",
            },
            list: {
              type: "array",
              title: "集合示例",
              items: {
                title: "单项",
                type: "string",
              },
            },
          },
        },
        operationData: {},
        }
        this.$router.push({name:"NewConfig"})
    },
  },
  created() {
    getProjectlist().then((res) => {
      this.projectlist = res;
    });
    //拿着当前项目id更新下方属性列表
    getAttributeList({currentProjectId:this.selectedProjectId}).then(res=>{
      this.attritubelist=res
    })
  }
};
</script>

<style>
</style>