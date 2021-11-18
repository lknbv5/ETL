<template>
  <a-spin size="large" :spinning="spinning" tip="Loading...">
    <div style="">
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
          :expand-depth="3"
        />
      </a-drawer>
      <a-form
        ref="form"
        @finish="saveAttr"
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
            treeNodeFilterProp="title"
            :replace-fields="{
              children: 'childCollection',
              key: 'id',
              value: 'id',
              title: 'attributeName',
            }"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item label="数据抽取类型">
          <a-radio-group
            v-model:value="currentAttr.extractType"
            button-style="solid"
          >
            <a-radio-button :value="0">HttpApi</a-radio-button>
            <a-radio-button :value="1">自定义配置</a-radio-button>
          </a-radio-group>
          <a-divider
            style="height: 1px; background-color: lightgray"
          ></a-divider>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ span: 13, offset: 6 }"
          style="margin-top: -35px"
        >
          <Demo
            v-if="currentAttr.extractType === 1"
            :schemaProps="currentAttr.operationSchema"
            :formDataProps="currentAttr.operationData"
            @changeData="changeData"
            @changeSchema="changeSchema"
          />
          <div v-else>
            <!-- <h4>HTTP API:</h4> -->
            <div>更新周期</div>
            <a-select
              v-model:value="currentAttr.frequency"
              style="width: 100px; margin-bottom: 10px; margin-top: 10px"
            >
              <a-select-option key="-1" :value="-1">未配置</a-select-option>
              <a-select-option key="0" :value="0">分更新</a-select-option>
              <a-select-option key="1" :value="1">时更新</a-select-option>
              <a-select-option key="2" :value="2">天更新</a-select-option>
              <a-select-option key="3" :value="3">周更新</a-select-option>
              <a-select-option key="4" :value="4">月更新</a-select-option>
              <a-select-option key="5" :value="5">年更新</a-select-option>
            </a-select>
            <div style="margin-bottom: 10px">请求地址</div>
            <a-input-group compact>
              <a-select
                v-model:value="currentAttr.requestType"
                style="width: 12%"
              >
                <a-select-option key="0" :value="0">Get</a-select-option>
                <!-- <a-select-option :value='1'>Post</a-select-option> -->
              </a-select>
              <a-input
                style="width: 88%"
                v-model:value="currentAttr.requestAddress"
              />
            </a-input-group>
            <div v-if="currentAttr.requestType===1">
                <div style="margin-top:10px">Post 请求参数：(Json)</div>
            <prism-editor
              class="my-editor"
              v-model:modelValue="currentAttr.RequestPar"
              :highlight="highlighter"
              line-numbers
            >
            </prism-editor>
            </div>
            <a-button
              style="padding: 5px; margin-top: 15px; color: #1890ff"
              @click="Preview"
            >
              <template #icon><SearchOutlined /></template>
              预览数据
            </a-button>
          </div>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button html-type="submit">
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
import { toRaw } from "vue";
import { httpget } from "../util/http";
import Demo from "../components/demo.vue";
import {
  getDicTree,
  gerIshasSameAttrName,
  gerIshasOtherSameAttrName,
  saveAttribute,
  updateAttribute,
} from "../util/Apiservice";
import { useStore } from "vuex";
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles


export default {
  name: "Config",
  props: {
    attr: Object,
    successCall: Function,
  },
  components: {
    Demo,
    PrismEditor,
  },
  data() {
    const store = new useStore();
    return {
      store,
      spinning: false,
      drawer_visible: false,
      previewData: {},
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
  computed: {
    newAttr: {
      get() {
        return this.store.state.newAttr;
      },
    },
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
    changeData(v) {
      this.currentAttr.operationData = v;
    },
    changeSchema(v) {
      this.currentAttr.operationSchema = v;
    },
    //保存属性
    saveAttr() {
      var reg = new RegExp(
        "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
      );
      if (this.currentAttr.extractType == 0) {
        if (
          this.currentAttr.requestAddress == null ||
          this.currentAttr.requestAddress == "" ||
          !reg.test(this.currentAttr.requestAddress)
        ) {
          this.$antdmessage.error("API请求地址有误，请确认后重试！");
          return;
        }
        if (this.currentAttr.frequency == -1) {
          this.$antdmessage.error("请配置更新周期！");
          return;
        }
      }
      if (this.newAttr) {
        //是新建，判断名称是否重复
        gerIshasSameAttrName({
          attname: this.currentAttr.attributeName,
          projectId: this.currentAttr.projectId,
        }).then((res) => {
          if (res === true) {
            //存在，弹窗报错
            this.$antdmessage.error("该项目下已存在同名属性,请重新命名后重试!");
          } else {
            //不存在，执行保存方法
            var item = toRaw(this.currentAttr);
            item.operationData = JSON.stringify(item.operationData);
            item.operationSchema = JSON.stringify(item.operationSchema);
            saveAttribute(item).then((res) => {
              if (res == true) {
                //保存成功
                this.$antdmessage.success("保存成功！");
                //路由切换
                this.$router.push({ name: "AttrSetting" });
                this.successCall();
              } else {
                this.$antdmessage.error(
                  "保存失败，请稍后重试，仍失败请联系管理员!"
                );
              }
            });
          }
        });
      } else {
        //是编辑，判断名称是否重复
        gerIshasOtherSameAttrName({
          attName: this.currentAttr.attributeName,
          projectId: this.currentAttr.projectId,
          attrid: this.currentAttr.id,
        }).then((res) => {
          if (res === true) {
            //存在，弹窗报错
            this.$antdmessage.error("该项目下已存在同名属性,请重新命名后重试!");
          } else {
            //不存在，执行更新方法
            //先转换一下Schema的值为string
            var item = toRaw(this.currentAttr);
            item.operationData = JSON.stringify(item.operationData);
            item.operationSchema = JSON.stringify(item.operationSchema);
            updateAttribute(item).then((res) => {
              if (res == true) {
                //保存成功
                this.$antdmessage.success("保存成功！");
                //路由切换
                this.$router.push({ name: "AttrSetting" });
                this.successCall();
              } else {
                this.$antdmessage.error(
                  "保存失败，请稍后重试，仍失败请联系管理员!"
                );
              }
            });
          }
        });
      }
    },
    //返回属性列表
    back() {
      this.$router.go(-1);
    },
    //预览数据
    Preview() {
      var reg = new RegExp(
        "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
      );
      //判断api 地址不为空，然后获取地址数据
      if (
        this.currentAttr.requestAddress == null ||
        this.currentAttr.requestAddress == "" ||
        !reg.test(this.currentAttr.requestAddress)
      ) {
        this.$antdmessage.warning("api地址无效，请确认后重试");
      } else {
        httpget(this.currentAttr.requestAddress, {})
          .then((res) => {
            this.previewData = res;
            this.drawer_visible = true;
          })
          .catch((errdata) => {
            console.log("errdata :>> ", errdata);
            this.$antdmessage.error("该请求地址无法访问，请确认无误后重试！");
          });
      }
    },
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
  created() {
    this.spinning = true;
    getDicTree()
      .then((res) => {
        this.treeData = res;
      })
      .then(() => {
        this.currentAttr = this.attr;
        console.log("currentAttr :>> ", this.currentAttr);
        if (typeof this.currentAttr.operationData == typeof "") {
          this.currentAttr.operationData = JSON.parse(
            this.currentAttr.operationData
          );
        }
        if (typeof this.currentAttr.operationSchema == typeof "") {
          this.currentAttr.operationSchema = JSON.parse(
            this.currentAttr.operationSchema
          );
        }
        this.spinning = false;
      });
  },
  mounted() {},
};
</script>

<style lang="css" scope>
.edit .ant-modal-body {
  height: 400px;
  width: 300px;
}
 /* required class */
  .my-editor {
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;
    min-height: 200px;
    margin: 10px 0;
    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
  }

  /* optional class for removing the outline */
  .prism-editor__textarea:focus {
    outline: none;
  }
</style>