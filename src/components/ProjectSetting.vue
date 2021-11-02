<template>
  <div>
    <a-button type="primary" @click="createNewProject"> 新建项目 </a-button>
    <a-divider style="background-color: lightgray" height="5px"/>
    <a-modal
      wrapClassName="create"
      v-model:visible="Createmodal_visible"
      title="新建项目"
      @ok="saveNewProject"
      centered
      okText="新建"
      cancelText="取消"
    >
      <a-form :model="project">
        <a-form-item label="项目名称">
          <a-input
            placeholder="输入项目名称"
            v-model:value="project.projectName"
          />
        </a-form-item>
        <a-form-item label="接口地址">
          <a-input
            placeholder="输入接口地址"
            v-model:value="project.projectApiAdd"
          />
          <span style="color: red; opacity: 0.6"
            >* 由英文（区分大小写）、数字、下划线组成</span
          >
        </a-form-item>
      </a-form>
    </a-modal>
    <a-drawer
      title="预览总数据"
      placement="right"
      :closable="true"
      v-model:visible="drawer_visible"
      width="30vw"
    >
      <json-viewer
        :value="allData"
        :copyable="{ copyText: '复制', copiedText: '已复制!' }"
        sort
        expanded
        preview-mode
      />
    </a-drawer>
    <a-modal
      wrapClassName="edit"
      v-model:visible="Editmodal_visible"
      title="编辑项目"
      @ok="saveEditProject"
      @cancel="cancelEditProject"
      centered
      okText="保存"
      cancelText="取消"
    >
      <a-form :model="project">
        <a-form-item label="项目名称">
          <a-input
            placeholder="输入项目名称"
            v-model:value="project.projectName"
          />
        </a-form-item>
        <a-form-item label="接口地址">
          <a-input
            placeholder="输入接口地址"
            v-model:value="project.projectApiAdd"
          />
          <span style="color: red; opacity: 0.6"
            >* 由英文（区分大小写）、数字、下划线组成</span
          >
        </a-form-item>
      </a-form>
    </a-modal>
    <a-list
      class="demo-loadmore-list"
      item-layout="horizontal"
      :data-source="projectList"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <template #actions>
            <a @click="EditProject(item)" >编辑</a>
            <a-popconfirm  
              ok-text="删除"
              placement="topRight"
              cancel-text="暂时不"
              @confirm="sureDel(item)"
              width="20px"
            >
              <template #icon>
                <question-circle-outlined style="color: red"/>
              </template>
              <template #title>
                <p>确定要删除当前项目及其下的所有属性吗？</p>
              </template>
              <a href="#" style="margin-right:100px">删除</a>
            </a-popconfirm>
          </template>
          <a-list-item-meta :description="item.projectApiAdd">
            <template #title>
              <a>{{ item.projectName }}</a>
            </template>
            <template #avatar>
              <img class="avatar" :src="url(item.projectNo)" />
            </template>
          </a-list-item-meta>
          <a-button type="primary" @click="showallData(item.projectApiAdd)">
            预览总数据
          </a-button>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script>
import md5 from "blueimp-md5";
import Identicon from "identicon.js";
import {
  getProjectlist,
  getProjectAllAttr,
  getIsHasOtherApiAdd,
  updateProject,
  getIsHasApiAdd,
  saveProject,
  deleteProject,
} from "../../src/util/Apiservice.js";

export default {
  name: "ProjectSetting",
  data() {
    return {
      drawer_visible: false,
      Editmodal_visible: false,
      Createmodal_visible: false,
      projectList: [],
      allData: {},
      project: {},
    };
  },
  methods: {
    showallData(apiadd) {
      this.drawer_visible = true;
      getProjectAllAttr(apiadd).then((res) => {
        this.allData = res;
      });
    },
    //点击创建新项目按钮
    createNewProject() {
      this.Createmodal_visible = true;
      this.project = {
        id: 0,
        projectNo: this.$uuidv4(),
        projectApiAdd: "",
        projectName: "",
      };
    },
    //点击编辑项目按钮
    EditProject(item) {
      this.project =this.$_.cloneDeep(item);
      this.Editmodal_visible = true;
    },
    //保存新项目
    saveNewProject() {
      //保存新项目
      var reg =/^[a-zA-Z_0-9]+$/
      var rr=reg.test(this.project.projectApiAdd);
      if (rr) {
        getIsHasApiAdd({add:this.project.projectApiAdd}).then(res=>{
            if (res==true) {
              this.$antdmessage.warning("Api地址已存在，请重新输入");
            }else{
              saveProject(this.project).then(res=>{
                if (res==true) {
                  console.log('保存结果：'+res)
                  this.$antdmessage.success("保存成功!");
                  this.Createmodal_visible=false;
                  this.onLoad();
                } else {
                  this.$antdmessage.error("保存失败!")
                }
              })
            }
          });
          
      } else {
        this.$antdmessage.warning("Api地址只允许输入英文、数字及下划线");
      }
      // this.$antdmessage.success("创建成功" + JSON.stringify(this.project));
    },
    //保存编辑的项目
    saveEditProject() {
      var reg =/^[a-zA-Z_0-9]+$/
      var rr=reg.test(this.project.projectApiAdd);
      if (rr) {
        getIsHasOtherApiAdd({add:this.project.projectApiAdd,projectId:this.project.id}).then(res=>{
            if (res==true) {
              this.$antdmessage.warning("Api地址已存在，请重新输入");
            }else{
              updateProject(this.project).then(res=>{
                if (res==true) {
                  console.log('更新结果'+res)
                  this.$antdmessage.success("更新成功!");
                  this.Editmodal_visible = false;
                  this.onLoad();
                } else {
                  this.$antdmessage.error("更新失败!")
                }
              })
            }
          });
      } else {
        this.$antdmessage.warning("Api地址只允许输入英文、数字及下划线");
      }
    },
    //确定删除
    sureDel(item){
        //执行删除操作
        deleteProject({projectId:item.id}).then(res=>{
          if (res==true) {
            //删除成功
            this.$antdmessage.success("删除成功!");
            this.onLoad();
          } else {
            //删除失败
            this.$antdmessage.error("删除失败!");
            this.onLoad();
          }
        });
    },
    //加载时刷新数据
    onLoad() {
      getProjectlist({}).then((res) => {
        this.projectList = res;
      });
    },
  },
  created() {
    this.onLoad();
  },
  computed: {
    url() {
      return function (a) {
        return "data:image/png;base64," + new Identicon(md5(a), 400).toString();
      };
    },
  },
  components: {},
};
</script>

<style scope>
.demo-loadmore-list {
  min-height: 500px;
}
.avatar {
  width: 40px;
  height: 40px;
}
.create .ant-modal-body {
  min-height: 200px;
}
.edit .ant-modal-body {
  min-height: 200px;
}
.NewDiv {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
</style>