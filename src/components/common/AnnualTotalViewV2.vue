<template>
<div class="annual-total">
  <span>{{ title }}：</span>
  <span class="annual-total-num">{{ annualTotalNum }}{{ annualTotalNum === '-' ? '' : unit }}</span>
</div>
</template>

<script>
export default {
  name: 'AnnualTotalV2',
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
  min-width: 300px;
  // padding: 16px 0 16px 0;
  display: flex;
  align-items: center;
}
.annual-total-num {
  font-size: 32px;
  color: #00AAEE;
  padding: 16px 0 16px 0;
}
</style>
