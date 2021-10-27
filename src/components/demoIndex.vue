<template>
  <div>
    <a-button type="primary" @click="showData">获取Data</a-button>
    <a-button type="primary" style="margin-left:10px" @click="showSchema">获取Schema结构</a-button>
    <Demo class="demo"
        :schemaProps="schema"
        :formDataProps="formData"
        :validate="onValidate"
        @changeData="changeData"
        @changeSchema="changeSchema"
    />
  </div>
</template>

<script>
import {reactive, toRefs} from 'vue';
import Demo from './demo';
export default {
  name: 'App',
  setup() {
    const state = reactive({
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
      formData: {
      },
    });

    const change = (v) => {
      state.formData = v;
      // console.log(v);
    }
    const onValidate = (v) => {
      console.log(v);
    }

    return {
      ...toRefs(state),
      change,
      onValidate,
    }
  },
  components: {
    Demo,
  },
  methods:{
    // changeData(currentschema){
    //   this.state.schema=currentschema;
    // },
    // changeSchema(currentschema){
    //   this.state.formData=currentschema;
    // },

    showData(){
        alert(window.JSON.stringify(this.state.formDate));
    },
    showSchema(){
      alert(window.JSON.stringify(this.state.schema));
    }

  }
}
</script>
<style>
  .menu {
    margin-bottom: 20px;
  }
  .demo {
    padding: 20px;
  }
</style>
