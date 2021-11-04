<template>
  <div style="width:50vw">
    <a-form
      :model="currentAttr"
      
      
    >
      <a-form-item label="Activity name">
        <a-input v-model:value="currentAttr.attributeName" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Config",
  props: {
    attr: Object,
  },
  data() {
    return {
      currentAttr: {},
    };
  },
  methods: {},
  created() {
    this.currentAttr = this.attr;
  },
};
</script>

<style>
</style>