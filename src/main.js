import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import {
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  Button,
  Card,
  Image,
  InputNumber,
  Slider,
  Switch,
  Popover,
  Upload,
  Collapse,
  Menu,
  Layout,
  Breadcrumb,
  List,
  Avatar,
  Drawer,
  Modal,
  Divider,
  Form,
  Popconfirm,
  Table,
  ConfigProvider,
  Tag,
  Tabs,
  Space,
  Tree,
  TreeSelect,
  Spin
} from 'ant-design-vue';
import {
  FileImageOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  PlusOutlined,
  BarsOutlined,
  DeleteOutlined,
  DragOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  RollbackOutlined,
  CloudUploadOutlined,
  KeyOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';
import JsonViewer from "vue3-json-viewer"

import 'ant-design-vue/dist/antd.css';

import _ from 'lodash';

import { v4 as uuidv4 } from "uuid";

import { message } from "ant-design-vue";
import store from './store'
import mitt from "mitt"

const app = createApp(App).use(store);

app.config.globalProperties.$mybus = new mitt()//全局使用事件总线
app.config.globalProperties.$_ = _;//全局使用lodash
app.config.globalProperties.$uuidv4=uuidv4;//全局试用uuid
app.config.globalProperties.$antdmessage=message;//全局试用antdmessage


app.use(JsonViewer)

app.use(Input);
app.use(Select);
app.use(DatePicker);
app.use(Radio);
app.use(Checkbox);
app.use(Button);
app.use(Card);
app.use(Image);
app.use(InputNumber);
app.use(Slider);
app.use(Switch);
app.use(Popover);
app.use(Upload);
app.use(Collapse);
app.use(Menu);
app.use(Layout);
app.use(Breadcrumb);
app.use(List);
app.use(Avatar);
app.use(Drawer);
app.use(Modal);
app.use(Divider);
app.use(Form);
app.use(Popconfirm);
app.use(Table);
app.use(ConfigProvider);
app.use(Tag);
app.use(Tabs);
app.use(Space);
app.use(Tree);
app.use(TreeSelect);
app.use(Spin);

app.component('FileImageOutlined', FileImageOutlined)
app.component('UploadOutlined', UploadOutlined)
app.component('PlusOutlined', PlusOutlined)
app.component('BarsOutlined', BarsOutlined)
app.component('DeleteOutlined', DeleteOutlined)
app.component('DragOutlined', DragOutlined)
app.component('QuestionCircleOutlined', QuestionCircleOutlined)
app.component("SearchOutlined",SearchOutlined )
app.component("PlusCircleOutlined",PlusCircleOutlined)
app.component("CloudUploadOutlined",CloudUploadOutlined)
app.component("RollbackOutlined",RollbackOutlined)
app.component("UserOutlined",UserOutlined)
app.component("KeyOutlined",KeyOutlined)


app.use(router);
app.mount('#app');
