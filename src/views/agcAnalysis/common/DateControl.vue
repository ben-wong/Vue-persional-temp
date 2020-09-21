<template>
  <div class="dateControl">
    <el-form :rules="dateRules" ref="dateRuleForm" label-position="left" label-width="100px" :inline="true" :model="dateFormDatas">
      <el-form-item class="inputDateClass" prop="startTime">
        <el-date-picker
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="起始时间"
            v-model="dateFormDatas.startTime"
            :picker-options="startPickerOptions"
            @change="startTimeChange">
          </el-date-picker>
          <span class="line">TO</span>
        </el-form-item>
        <el-form-item class="inputDateClass" prop="endTime">
          <el-date-picker
            style="width: 100%;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="结束时间"
            v-model="dateFormDatas.endTime"
            :picker-options="endPickerOptions"
            @change="endTimeChange"
          >
          </el-date-picker>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { formatDate } from '@/const/agcReport/commonFun';
export default {
  name: 'DateControl',
  data() {
    return {
      dateFormDatas: {
        startTime: '',
        endTime: '',
      },
      dateRules: {
        startTime: [
          { required: true, message: '请选择起始时间', trigger: 'change' }
        ],
        endTime: [
          { required: true, message: '请选择结束时间', trigger: 'change' }
        ]
      },
      startPickerOptions: {
        disabledDate: (time) => {
          let { startTime, endTime } = this.dateFormDatas;
          // 起始时间、结束时间 均为null
          if (!startTime && !endTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 结束时间 为null
          if (!endTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 结束时间转换成Date对象
          let endTimeDate = new Date(endTime);
          // 结束时间转换成时间戳
          let endTimeDateTimestamp = endTimeDate.getTime() - 8 * 60 * 60 * 1000;
          // 1.当前截止时间之后时间不可选；2.当前截止时间之前的180天内可选，超过180不可选
          return (time.getTime() > endTimeDateTimestamp) || ((endTimeDateTimestamp - time.getTime() - 180 * 24 * 60 * 60 * 1000) >= 0);
        },
      },
      endPickerOptions: {
        disabledDate: (time) => {
          let { startTime, endTime } = this.dateFormDatas;
          // 起始时间、结束时间 均为null
          if (!startTime && !endTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 起始时间 为null
          if (!startTime) {
            // 今天之后时间不可选
            return time.getTime() > Date.now();
          }
          // 起始时间转换成Date对象
          let startTimeDate = new Date(startTime);
          // 起始时间转换成时间戳
          let startTimeDateTimestamp = startTimeDate.getTime() - 8 * 60 * 60 * 1000;
          // 1.今天之后时间不可选 2.当前起始时间之前时间不可选；3.当前起始时间之后的180天内可选，超过180不可选；
          return time.getTime() > Date.now() || time.getTime() < startTimeDateTimestamp || ((time.getTime() - startTimeDateTimestamp - 180 * 24 * 60 * 60 * 1000) >= 0);
        },
      },
    };
  },
  created() {
    // 给初始时间
    let endTimestamp = new Date().getTime(); // 今天的时间戳
    this.dateFormDatas.endTime = formatDate(endTimestamp, 1);
    let startTimestamp = new Date().setMonth(new Date().getMonth() - 1); // 一个月前时间点的时间戳
    this.dateFormDatas.startTime = formatDate(startTimestamp, 1);

    this.$emit('startTimeEmit', this.dateFormDatas.startTime);
    this.$emit('endTimeEmit', this.dateFormDatas.endTime);
  },
  methods: {
    // 起始时间变动
    startTimeChange(val) {
      this.$emit('startTimeEmit', val);
    },
    // 结束时间变动
    endTimeChange(val) {
      this.$emit('endTimeEmit', val);
    },
  }
};
</script>
<style lang="scss" scoped>
.dateControl ::v-deep {
  .el-form {
    .inputDateClass {
      div.el-input {
          width: 150px!important;
        }
        .el-icon-question {
          margin-left: 5px;
          font-size: 17px;
          color: #ccc;
          position: absolute;
          top: 11px;
          cursor: pointer;
        }
    }
    .line {
      text-align: center;
      display: inline-block;
      margin-left: 14px;
      margin-right: 4px;
    }
  }
}
</style>
