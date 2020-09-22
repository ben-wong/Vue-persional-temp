<template>
<el-row class="annual-total">
  <el-col><p>{{ title }}</p></el-col>
  <el-col><div class="annual-total-num">{{ annualTotalNum }}{{ annualTotalNum === '-' ? '' : unit }}</div></el-col>
</el-row>
</template>

<script>
export default {
  name: 'AnnualTotal',
  props: {
    title: {
      type: String,
      required: false,
      default: '-'
    },
    annualTotalNum: {
      type: String,
      required: false,
      default: '-'
    },
    unit: {
      type: String,
      required: false,
      default: ''
    }
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
}
.annual-total{
  min-width: 200px;
}
.annual-total-num {
  font-size: 32px;
  color: #00AAEE;
  padding: 4px 0 28px 0;
}
</style>
