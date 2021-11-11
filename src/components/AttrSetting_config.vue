<template>
 <a-spin size="large" :spinning="spinning" tip="Loading...">
<div style="">
    <a-form
      style="width: 100%"
      class="center"
      layout="vertical"
      :model="currentAttr"
      :label-col="{
        span: 13,
        offset: 6,
      }"
      :wrapperCol="{
        span: 13,
        offset: 6,
      }"
      :rules="rules"
    >
      <a-form-item
        label="属性名称（由英文、数字、下划线组成）"
        name="attributeName"
      >
        <a-input
          v-model:value="currentAttr.attributeName"
          placeholder="请输入英文属性名称"
        />
        <!-- <span style="font-size: 8px; color: gray">名称由英文、数字、下划线组成，且同一项目内不可重复</span> -->
      </a-form-item>
      <a-form-item label="数据描述" ellipsis>
        <a-textarea
          v-model:value="currentAttr.description"
          placeholder="请输入属性描述"
        />
      </a-form-item>
      <!-- <a-form-item label="通用字典">
        <a-input disabled style="width: 60%"></a-input>
        <a-button style="margin-left: 15px; color: #1890ff" @click="chooseDic"
          >选择标准</a-button
        >
      </a-form-item> -->
      <a-form-item label="通用字典">
        <a-tree-select
          v-model:value="currentAttr.commonAttrNo"
          style="width: 100%"
          allow-clear
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          :tree-data="treeData"
          placeholder="请选择通用字典"
          showSearch
          searchPlaceholder="search"
          treeNodeFilterProp='title'
          :replace-fields="{children:'childCollection', key:'id', value: 'id', title: 'attributeName'}"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item label="数据抽取类型">
        <a-radio-group v-model:value="currentAttr.extractType" button-style="solid">
          <a-radio-button :value="0">HttpApi</a-radio-button>
          <a-radio-button :value="1">自定义配置</a-radio-button>
        </a-radio-group>
        <a-divider style="height: 1px; background-color: lightgray"></a-divider>
      </a-form-item>
      <a-form-item
        :wrapper-col="{ span: 13, offset: 6 }"
        style="margin-top: -35px"
      >
        <Demo
          v-if="currentAttr.extractType===1"
          :schemaProps="currentAttr.operationSchema"
          :formDataProps="currentAttr.operationData"
          @changeData="changeData"
          @changeSchema="changeSchema"
        />
        <div v-else>
          <h4>HTTP API:</h4>
          <a-input-group compact>
            <a-select
              v-model:value="currentAttr.requestType"
              style="width: 12%"
            >
              <a-select-option :value="currentAttr.requestType">Get</a-select-option>
              <!-- <a-select-option :value='1'>Post</a-select-option> -->
            </a-select>
            <a-input style="width: 88%" v-model:value="currentAttr.requestAddress" />
          </a-input-group>
          <a-button
            style="padding: 5px; margin-top: 10px; color: #1890ff"
            @click="PreviewData"
          >
            <template #icon><SearchOutlined /></template>
            预览数据
          </a-button>
        </div>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button @click="saveAttr">
            <template #icon><CloudUploadOutlined /></template>
            保 存</a-button
          >
          <a-button @click="back">
            <template #icon><RollbackOutlined /></template>
            返 回</a-button
          >
        </a-space>
      </a-form-item>
    </a-form>
  </div>
 </a-spin>
</template>

<script>
import Demo from "../components/demo.vue";
import { getDicTree } from "../util/Apiservice";

export default {
  name: "Config",
  props: {
    attr: Object,
  },
  components: {
    Demo,
  },
  data() {
    return {
      spinning:false,
      chooseDicVisible: false,
      currentAttr: {},
      radioValue: "0",
      treeData: [],
      rules: {
        attributeName: [
          {
            required: true,
            message: "请输入属性名称",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z_0-9]+$/,
            message: "名称只能由英文、数字、下划线组成",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    changeData(v) {
      this.currentAttr.operationData = v;
    },
    changeSchema(v) {
      this.currentAttr.operationSchema = v;
    },
    //保存属性
    saveAttr() {
      alert(window.JSON.stringify(this.currentAttr));
    },
    //返回属性列表
    back() {
      this.$router.go(-1);
    },
    //预览数据
    PreviewData() {},
    //选择字典
    chooseDic() {
      
      getDicTree().then((res) => {
        this.treeData = this.generateOptions(res);
      });
    },
    //选择字典完成
    chooseDicDone() {
      //更新类中字典名称和字典编码
    },
  },
  created(){
    this.spinning=true;
   getDicTree().then((res) => {
        this.treeData = res;
    }).then(()=>{
          this.currentAttr =this.attr;
          this.spinning=false;
    });
  },
  mounted() {
    
  },
};
</script>

<style lang="css">
.edit .ant-modal-body {
  height: 400px;
  width: 300px;
}
</style>