<template>
<div class="edu-text-start">
  <div style="margin-bottom: 5px">
    <p class="edu-title">{{ title }}</p>
  </div>
  <span class="edu-date">{{ formatNum(nums) }}</span>
  <span class="edu-num-color">
    <span>日：<span v-show="isShowDodArrow"><i class="el-icon-top color-danger" v-if="dayWeekData && dayWeekData.dod >= 0"></i><i class="el-icon-bottom color-success" v-else></i></span>{{ formatDot(dayWeekData && dayWeekData.dod) }}</span>
    <span class="edu-week-raito">周：<span v-show="isShowWowArrow"><i class="el-icon-top color-danger" v-if="dayWeekData && dayWeekData.wow >= 0"></i><i class="el-icon-bottom color-success"  v-else></i></span>{{ formatDot(dayWeekData && dayWeekData.wow) }}</span>
  </span>
</div>
</template>

<script>
import { toThousands, toThousandsInt, percentMax } from '@/utils/index';
export default {
  name: 'DayWeekView',
  data: () => {
    return {
      isShowDodArrow: false,
      isShowWowArrow: false,
    };
  },
  methods: {
    formatNum(val) {
      if (this.numType === 'int') {
        return toThousandsInt(val);
      }
      if (this.numType === 'dot') {
        return toThousands(val);
      }
      if (this.numType === 'percent') {
        return percentMax(val);
      }
      return val;
    },
    formatDot(val) {
      if (!this.dayWeekData) {
        return '-';
      }
      if (val === '0' || val === 0) {
        return '0.0%';
      }
      if (!val || val === '-') {
        return '-';
      }
      const v = Math.abs(+val);
      return percentMax(v);
    },
  },
  computed: {
    nums() {
      if (!this.dayWeekData) {
        return '-';
      }
      if (this.dayWeekData.value === '0' || this.dayWeekData.value === 0 || this.dayWeekData.users === '0' || this.dayWeekData.users === 0) {
        return '0';
      }
      return this.dayWeekData.value || this.dayWeekData.users;
    }
  },
  watch: {
    'dayWeekData.dod': {
      handler(val) {
        if (val === '0' || val === 0) {
          this.isShowDodArrow = true;
          return;
        }
        if (!val) {
          this.isShowDodArrow = false;
          return;
        }
        if (typeof this.dayWeekData.dod === 'object' && !this.dayWeekData.dod) {
          this.isShowDodArrow = false;
          return;
        }
        this.isShowDodArrow = true;
      },
      deep: true,
      immediate: true
    },
    'dayWeekData.wow': {
      handler(val) {
        if (val === '0' || val === 0) {
          this.isShowWowArrow = true;
          return;
        }
        if (!val) {
          this.isShowWowArrow = false;
          return;
        }
        if (typeof this.dayWeekData.wow === 'object' && !this.dayWeekData.wow) {
          this.isShowWowArrow = false;
          return;
        }
        this.isShowWowArrow = true;
      },
      deep: true,
      immediate: true
    }
  },
  props: {
    dayWeekData: {
      type: Object,
      required: false,
      default: () => {
        return {
          users: '',
          value: '',
          dod: '',
          wow: '',
        };
      }
    },
    numType: {
      type: String,
      required: false,
      default: () => 'int'
    },
    title: {
      type: String,
      required: false,
      default: '-'
    }
  }
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .edu-text-start {
    text-align: start;
    min-width: 200px;
  }
  .edu-text-start >>> i {
    padding: 0 1px;
  }
  .edu-week-raito {
    padding-left: 20px;
  }
  .edu-title {
    font-size: 14px;
    /* color: #000; */
  }
  .edu-num-color{
    color: #9E9E9E
  }
  .edu-date {
    padding: 4px 0;
    margin-right: 20px;
    font-size: 32px;
    color: #00AAEE
  }
  .color-danger {
    color: red
  }
  .color-success {
    color: #67C23A
  }
</style>
