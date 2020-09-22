<template name="component-name">
  <div>
    <el-form
      :inline="true"
      :rules="queryRules"
      label-position="right"
      label-width="120px"
      style="margin-top:20px"
    >
      <el-form-item label="日期：" prop="startDate">
        <el-date-picker
          size="mini"
          type="date"
          format="yyyy-MM-dd"
          value-format="timestamp"
          v-model="queryForm.startDate"
          :picker-options="pickerOptionStart"
          :placeholder="$t('common.selectStartTime')"
          :editable="false"
          :clearable="true"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="-" label-width="12px" prop="endDate">
        <el-date-picker
          size="mini"
          type="date"
          format="yyyy-MM-dd"
          value-format="timestamp"
          v-model="queryForm.endDate"
          :picker-options="pickerOptionEnd"
          :placeholder="$t('common.selectEndTime')"
          :editable="false"
          :clearable="true"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-radio-group size="mini" v-model="queryForm.period" @change="changePeriod">
          <el-radio label="week">周</el-radio>
          <el-radio label="month" disabled>月</el-radio>
          <el-radio label="day">自定义</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item class="el-form-item-last">
        <el-button type="primary" size="mini" @click="onQuery">{{$t('common.query')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// const thirtyDays = 30 * 24 * 3600 * 1000;
// const yesterdayTimeStamp = Date.now() - 24 * 60 * 60 * 1000;

export default {
  name: 'DatePickerView',
  data() {
    return {
      queryRules: {},
    };
  },
  props: {
    queryData: {
      type: Object,
      required: false,
      default: () => {
        return {
          startDate: '',
          endDate: '',
          period: ''
        };
      }
    }
  },
  computed: {
    queryForm() {
      return this.queryData;
    },
    pickerOptionStart() {
      return { disabledDate: this.disabledDateStart };
    },
    pickerOptionEnd() {
      return { disabledDate: this.disabledDateEnd };
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    disabledDateStart(time) {
      if (!this.queryForm.endDate) {
        return time.getTime() > new Date(new Date().toLocaleDateString()).getTime() - 1;
      }
      let thirtyDays = 30 * 24 * 3600 * 1000;
      if (this.queryForm.period === 'day') {
        thirtyDays = 30 * 24 * 3600 * 1000;
      }
      if (this.queryForm.period === 'week') {
        thirtyDays = 3000 * 24 * 3600 * 1000;
      }
      const endDateM = this.queryForm.endDate;
      const subDate = endDateM - thirtyDays > new Date(new Date().toLocaleDateString()).getTime() - 1
        ? new Date(new Date().toLocaleDateString()).getTime() - 1
        : endDateM - thirtyDays;
      return time.getTime() > endDateM || time.getTime() < subDate;
    },
    disabledDateEnd(time) {
      if (!this.queryForm.startDate) {
        return time.getTime() > new Date(new Date().toLocaleDateString()).getTime() - 1;
      }
      let thirtyDays = 30 * 24 * 3600 * 1000;
      if (this.queryForm.period === 'day') {
        thirtyDays = 30 * 24 * 3600 * 1000;
      }
      if (this.queryForm.period === 'week') {
        thirtyDays = 3000 * 24 * 3600 * 1000;
      }
      const startDateM = new Date(this.queryForm.startDate).getTime();
      // const startDateM = this.queryForm.startDate;
      const addDate = startDateM + thirtyDays > new Date(new Date().toLocaleDateString()).getTime() - 1
        ? new Date(new Date().toLocaleDateString()).getTime() - 1
        : startDateM + thirtyDays;
      return time.getTime() < startDateM || time.getTime() > addDate;
    },
    onQuery() {
      if (!(this.queryForm.startDate && this.queryForm.endDate)) {
        this.$message({
          message: '请选择起止时间',
          type: 'error'
        });
        return;
      };
      const time = this.queryForm.endDate - this.queryForm.startDate;
      if (this.queryForm.period === 'week' && time > 31 * 7 * 24 * 60 * 60 * 1000) {
        this.$message({
          message: '起止时间不能超过31周',
          type: 'error'
        });
        return;
      };
      this.$emit('QUERY_BTN', this.queryForm);
    },
    changePeriod() {
      if (this.queryForm.period === 'week' || this.queryForm.period === 'month') {
        this.queryForm.startDate = '';
        this.queryForm.endDate = '';
      }
    }
  },
};
</script>
