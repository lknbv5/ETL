<template>
  <div class="demo-preview">
    <div style="flex: 1;margin-right: 20px;">
        <p class="title">Schema配置</p>
        <prism-editor
        class="my-editor"
        :modelValue="schemaStr"
        @update:modelValue="changeSchema"
        :highlight="highlighter"
        line-numbers
    >
    </prism-editor>
    </div>
     <div style="flex: 1;">
       <p class="title">结构预览</p>
       <div class="preview" >
        <formRender 
          v-if="!error"
          :schema="schema"
          :formData="formData"
          @on-change="change"
        />
      <div v-else>
        {{error}}
      </div>
    </div>
     </div>
    
  </div>
</template>

<script>
import parseJson from 'json-parse-better-errors';
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; // import the styles somewhere
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; // import syntax highlighting styles

import {reactive, toRefs} from 'vue';
import formRender from '../../packages/index.jsx';

const schema2str = obj => JSON.stringify(obj, null, 2) || '';

export default {
  name: 'demo',
  props: {
    schemaProps: Object,
    formDataProps: Object,
  },
  setup({schemaProps, formDataProps},context) { // eslint-disable-line
    const state = reactive({
      schema: schemaProps,
      formData: formDataProps,
      error: '',
      schemaStr: '',
    });
    const change = (v) => {
      state.formData = v;
      context.emit("changeData",state.formData);
    }
    const tryParse = (schemaStr) => {
      let schema = {};
      try {
        schema = parseJson(schemaStr);
        if (typeof schema !== 'object') {
          state.error = 'schema非正确json';
          return;
        }
        state.error = '';
        return schema;
      } catch (error) {
        state.error = String(error);
      }
      return '';
    }

    const changeSchema = (v) => {
      try {
        state.schemaStr = v;
        const schema = tryParse(v);
        if (schema) {
          state.schema = schema;
        }
        context.emit("changeSchema",state.schema);
      } catch (e) {
        console.log(e);
      }
    }
    state.schemaStr = schema2str(state.schema);
    return {
      ...toRefs(state),
      change,
      changeSchema
    }
  },
  components: {
    formRender,
    PrismEditor,
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
  }
}
</script>


<style lang="less">
.demo-preview {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  .preview {
    padding-left: 8px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #ddd ;
    border-radius:4px
  }
}
/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
  color: #ccc;
  border-radius:4px;
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

.title{
  font-weight:600;font-size:16px;margin-bottom:10px
}
</style>
