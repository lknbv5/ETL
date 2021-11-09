<template>
  <div id="DemoS">
    <a-button type="primary" @click="showData">获取Data</a-button>
    <a-button type="primary" style="margin-left:10px" @click="showSchema">获取Schema结构</a-button>
    <Demo class="demo"
        :schemaProps="schema"
        :formDataProps="formData"
        @changeData="changeData"
        @changeSchema="changeSchema"
    />
  </div>
</template>

<script>
// import {reactive, toRefs} from 'vue';
import Demo from './demo';
export default {
  name: 'DemoIndex',
  data(){
    return{
      schema: {
      "type": "object", 
      "title":"示例",
      "properties": {
      "id": {
        "title": "数字示例",
        "type": "number"
      },
      "name": {
        "title": "文本实例",
        "type": "string"
      },
        "list": {
          "type": "array",
          "title": "集合示例",
          "items":{
          "title":"单项",
          "type":"string"
            }
          }
        }
      },
      formData: {}
    }
  },
  components: {
    Demo,
  },
  methods:{
    changeData (v){
      this.formData = v;
    },

     changeSchema (v){
      this.schema = v;
    },
    showData(){
        alert(window.JSON.stringify(this.formData));
    },
    showSchema(){
       alert(window.JSON.stringify(this.schema));
    }

  }
}
</script>
<style>
  #DemoS{
    height: max-content;
  }
  .menu {
    margin-bottom: 20px;
  }
  .demo {
    padding: 0px;
  }
</style>
