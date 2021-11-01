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
} from 'ant-design-vue';
import {
  FileImageOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
  PlusOutlined,
  BarsOutlined,
  DeleteOutlined,
  DragOutlined,
} from '@ant-design/icons-vue';
import JsonViewer from "vue3-json-viewer"

import 'ant-design-vue/dist/antd.css';



const app = createApp(App);

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
app.use(Form );
app.use(Popconfirm);

app.component('FileImageOutlined', FileImageOutlined)
app.component('UploadOutlined', UploadOutlined)
app.component('PlusOutlined', PlusOutlined)
app.component('BarsOutlined', BarsOutlined)
app.component('DeleteOutlined', DeleteOutlined)
app.component('DragOutlined', DragOutlined)
app.component('QuestionCircleOutlined', QuestionCircleOutlined)



app.use(router);
app.mount('#app');
